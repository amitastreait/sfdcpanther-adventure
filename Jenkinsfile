#!groovy
import groovy.json.JsonSlurperClassic
node {

    def BUILD_NUMBER=env.BUILD_NUMBER
    def RUN_ARTIFACT_DIR="tests/${BUILD_NUMBER}"
    def SFDC_USERNAME

    def HUB_ORG=env.HUB_ORG_DH
    def SFDC_HOST = env.SFDC_HOST_DH
    def JWT_KEY_CRED_ID = env.JWT_CRED_ID_DH
    def CONNECTED_APP_CONSUMER_KEY=env.CONNECTED_APP_CONSUMER_KEY_DH

    println 'KEY IS' 
    println JWT_KEY_CRED_ID
    println HUB_ORG
    println SFDC_HOST
    println CONNECTED_APP_CONSUMER_KEY

    stage('checkout source code ') {
        // when running in multi-branch job, one must issue this command
        checkout scm
    }

    withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'jwt_key_file')]) {
        stage('Deploye Code') {
            if (isUnix()) {
                rc = sh returnStatus: true, script: "sfdx force:auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwtkeyfile ${jwt_key_file} --setdefaultdevhubusername --instanceurl ${SFDC_HOST}"
            }else{
                 rc = bat returnStatus: true, script: "sfdx force:auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwtkeyfile \"${jwt_key_file}\" --setdefaultdevhubusername --instanceurl ${SFDC_HOST}"
            }
            if (rc != 0) { error 'hub org authorization failed' }

			println rc
			
			// need to pull out assigned username
			if (isUnix()) {
				//rmsg =  sh returnStdout: true, script: "sfdx force:mdapi:deploy -d manifest/. -u ${HUB_ORG}"
        println(' Creating Scratch ORG..')
        scratchorg =  sh returnStdout: true,  script : "sfdx force:org:create -f ./config/project-scratch-def.json -a ci-cd-org -s -w 10 -d 30"
        println(' Convert SFDC Project to normal project')
        srccode = sh returnStdout: true, script : "sfdx force:mdapi:convert -d src -r force-app"
        println(' Deploy the code into Scratch ORG.')
        sourcepush = sh returnStdout: true, script : "sfdx force:mdapi:deploy -d ./src -u ${HUB_ORG}"
        println(' Assign the Permission Set to the New user ')
        permset = sh returnStdout: true, script : "sfdx force:user:permset:assign -n yeurdreamin"
        println(' Import Contact and Account Data ')
        dataimport = sh returnStdout: true, script : "sfdx force:data:tree:import --plan ./data/data-plan.json"
        
			}else{
			   //rmsg = bat returnStdout: true, script: "sfdx force:mdapi:deploy -d manifest/. -u ${HUB_ORG}"
        println(' Creating Scratch ORG..')
        scratchorg =  bat returnStdout: true,  script : "sfdx force:org:create -f ./config/project-scratch-def.json -a ci-cd-org -s -w 10 -d 30"
        println(' Convert SFDC Project to normal project')
        srccode = bat returnStdout: true, script : "sfdx force:mdapi:convert -d src -r force-app"
        println(' Deploy the code into Scratch ORG.')
        sourcepush = bat returnStdout: true, script : "sfdx force:mdapi:deploy -d ./src -u ${HUB_ORG}"
        println(' Assign the Permission Set to the New user ')
        permset = bat returnStdout: true, script : "sfdx force:user:permset:assign -n yeurdreamin"
        println(' Import Contact and Account Data ')
        dataimport = bat returnStdout: true, script : "sfdx force:data:tree:import --plan ./data/data-plan.json"
			}
			  
       printf rmsg
       println('Hello from a Job DSL script!')
       println(rmsg)
        }
    }
}
