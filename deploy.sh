#!/bin/sh

# Simple deployment script that runs grunt tasks for server and client files that prepare and package them for
# deployment, and then executes the deployment to the specified location.
#
# TODO wrap repeated code into a function

# save current working directory
tld=$(pwd)

echo "Which environment would you like to deploy?"
select env in "Heroku" "Azure"; do
  case $env in
    Heroku ) 
      echo "Preparing server files for deployment"
      cd "$tld/server"
      
      # watch output to see if any of the grunt tasks failed
      exec grunt heroku | while read line; do
        echo $line
        if [[ $line =~ "Aborted due to warnings" ]]; then
          exit 1
        fi
      done

      # if grunt failed then stop execution
      if [[ $? -ne 0 ]]; then
        exit 1
      fi

      echo "Preparing client files for deployment"
      cd "$tld/client"

      # watch output to see if any of the grunt tasks failed
      exec grunt heroku | while read line; do
        echo $line
        if [[ $line =~ "Aborted due to warnings" ]]; then
          exit 1
        fi
      done

      # if grunt failed then stop execution
      if [[ $? -ne 0 ]]; then
        exit 1
      fi

      echo "Deploying to Heroku"
      cd "$tld/_heroku"
      (exec git add .)
      (exec git add -u .)
      (exec git commit)
      (exec git push heroku master) 
    break;;
    
    Azure )
      echo "Preparing server files for deployment"
      cd "$tld/server"

      # watch output to see if any of the grunt tasks failed
      exec grunt azure | while read line; do
        echo $line
        if [[ $line =~ "Aborted due to warnings" ]]; then
          exit 1
        fi
      done

      # if grunt failed then stop execution
      if [[ $? -ne 0 ]]; then
        exit 1
      fi

      echo "Preparing client files for deployment"
      cd "$tld/client"

      # watch output to see if any of the grunt tasks failed
      exec grunt azure | while read line; do
        echo $line
        if [[ $line =~ "Aborted due to warnings" ]]; then
          exit 1
        fi
      done

      # if grunt failed then stop execution
      if [[ $? -ne 0 ]]; then
        exit 1
      fi

      echo "Pushing to GIT and deploying to Azure"
      cd "$tld/_azure"
      (exec git add .)
      (exec git add -u .)
      (exec git commit)
      (exec git push azure master)
  
    exit;;
  esac
done