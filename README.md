# yeurdreamin-adventure
How to use Salesforce DX with Jenkins to implement Continuous deployment and Continuous Integration.
# Scope: - 
Scope of the document is to provide the step by step solution to implement the SFDX with jenkins Server so that project can take the advantage of SFDX continuous delivery and development capabilities including the source control management.

# Content
1. Download, install the OpenSSL in your Machine and configure the path of Open SSL
2. Generate Private Key
3. Generate pass key using the private key
4. Generate certificate file
5. Generate the SSL Certificate using certificate file
6. Create Connected App in Salesforce ORG
7. Test the Connected App
8. Test the setup in Team Foundation Server
9. Resources

# Download and install the OpenSSL in your Machine: - 
Visit this [Link](https://sourceforge.net/projects/openssl/) and download the OpenSSL. After downloading install the software in your machine. Note: - OpenSSL is required to install so that we can generate the required certificate.
Configure the path: - Once you are done with the installation part from the above run the below command form Command prompt 
``` set OPENSSL_CONF=C:\openssl\share\openssl.cnf```
Where OPENSSL_CONF is name of the path
```C:\openssl\share\openssl.cnf is the path of the OpenSSL folder be sure that you are using the correct Path```
Now, run `openssl version` command.

While setting the environment variable use `OPENSSL_CONF` as variable name and the path of SSL directory as Variable Value.

# Generate Private Key: - 
Once you are done with OpenSSL setup, next step is generating the RSA private key. To do this run `openssl genrsa -des3 -passout pass:x123 -out server.pass.key 2048` command.

`Note: - If you wanted to change the directory where you wanted to store the key feel free to change the same.`
# Generate pass key using the private key: - 
Now, we have generated the pass key. It’s time to generate the key which will be used in SFDX command. Run `openssl rsa -passin pass:x123 -in server.pass.key -out server.key` command from the command prompt.


# Generate certificate file: - 
Next step is to generate certificate file with the following command. In this command we will use the server key that we generated in our previous step. It will ask some information do provide the information and then .cs file will get generated.
`openssl req -new -key server.key -out server.csr`


# Generate the SSL Certificate using certificate file: - 
Once we have generated the certificate file, time to generate the certificate file which we will use while we will be creating the connected app in salesforce org. Run `openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt` to generate the certificate file.


# Create Connected App in Salesforce ORG: -

# Login into your Salesforce Application
1. For Lightning environment navigate to Setup -> App Manager -> New Connect App
2. For classic environment navigate to Setup -> Create -> Apps -> Scroll down to Connected App section then Click New
3. Provide Connected App Name and Contact Email. API Name will automatically be populated. 
4. Check Enable OAuth Settings under API (Enable OAuth Settings) section.
5. Enter ```http://localhost:1717/OauthRedirect``` for Callback URL
6. Check Use digital signatures checkbox and upload your ```server.crt``` file that you generated using command prompt.
7. Scroll down and save the application. If it prompts, select continue. 
8. Now Click on manager and then Click Edit Policies
9 See select ```"Admin approved users are pre-authorized"``` for Permitted Users under OAuth Policies to avoid ```"Not approved for access in salesforce"``` issue. 
10. Go ahead and save the application
11. Scroll down and Click on ```“Manage Profiles”``` and then select the appropriate profiles. So that the users with selected profiles can took the advantage of connected app.
12. Now, go back to the connected application and copy the Consumer Key. Paste is somewhere we will use this while testing the flow.

![](https://github.com/amitastreait/yeurdreamin-adventure/blob/master/Screenshot%202019-04-14%20at%205.15.41%20PM.png)

![](https://github.com/amitastreait/yeurdreamin-adventure/blob/master/Screenshot%202019-04-14%20at%205.17.00%20PM.png)

![](https://github.com/amitastreait/yeurdreamin-adventure/blob/master/Screenshot%202019-04-14%20at%205.17.33%20PM.png)


Now time to test the Validate whatever we did till now run the below command from command prompt  

`sfdx force:auth:jwt:grant --clientid {ADD_YOUR_CLIENT_ID} --jwtkeyfile {ABSOLUTE_PATH_TO_YOUR_SERVER.KEY_FILE} --username {ADD_YOUR_USERNAME} --instanceurl https://login.salesforce.com`

For example, after providing all the parameters command will look like below: -
`Sfdx force:auth:jwt:grant --clientid 3MVG9d8..z.hDcPLY4bmwfad6ruB7brligtSCyhGb3JUZb5QxEriQthD6d9JIl0h.wV5f5cum9WhPTkdTtRnE --jwtkeyfile C:\Users\amitsingh4\Desktop\Keys\server.key --username sfdcpanther@trails.com --setdefaultusername --setalias ciorg --instanceurl https://login.salesforce.com/`

In the above command we are using below parameters
`clientid:  - Provide Consumer Key of the connected application that you copied`

`jwtkeyfile: - Absolute path to the location where you generated your OpenSSL server.key file. For example: - C:\Users\amitsingh4\Desktop\Keys\server.key`

`instanceurl: -provide instanceurl of the org that you wanted to authorize. By Default, the instance URL is https://login.salesforce.com.`

`setdefaultusername: - username of the user which is present in Salesforce ORG and profile has access to connected application.`

### Below are the salesforce dx commands that we are going to use in our demo
```
println(' Creating Scratch ORG..')
sfdx force:org:create -f ./config/project-scratch-def.json -a ci-cd-org -s -w 10 -d 30
println(' Convert SFDC Project to normal project')
sfdx force:mdapi:convert -d src -r force-app
println(' Deploy the code into Scratch ORG.')
sfdx force:mdapi:deploy -d ./src -u ${HUB_ORG}
println(' Assign the Permission Set to the New user ')
sfdx force:user:permset:assign -n yeurdreamin"
println(' Import Contact and Account Data ')
sfdx force:data:tree:import --plan ./data/data-plan.json
```


# Resources: - 
[Salesforce Doc](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ci_jenkins.htm)

[Apex Hours](http://amitsalesforce.blogspot.com/2019/01/continuous-integration-using-jenkins-with-salesforceDx.html)

[Open SSL](https://sourceforge.net/projects/openssl/)

[JenkinsFile](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ci_jenkins_sample_walkthrough.htm)

[ConnectedApp](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_connected_app.htm)

[Generate Certificate](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_key_and_cert.htm)

