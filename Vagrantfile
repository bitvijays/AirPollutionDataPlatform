# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  #Install vagrant-disksize to allow resizing the vagrant box disk.
  unless Vagrant.has_plugin?("vagrant-disksize")
    raise Vagrant::Errors::VagrantError.new, "vagrant-disksize plugin is missing. Please install by using 'vagrant plugin install vagrant-disksize' and rerun 'vagrant up'"
  end

  #Install vagrant-reload to allow restarting the vagrant box
  unless Vagrant.has_plugin?("vagrant-reload")
    raise Vagrant::Errors::VagrantError.new, "vagrant-reload plugin is missing. Please install by using 'vagrant plugin install vagrant-reload' and rerun 'vagrant up"
  end
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "base"
  #config.vm.provision "shell", inline: 'sudo apt update -y && sudo apt upgrade -y'

  config.vm.define "ckan" do |ckan|
    ckan.vm.box = "ubuntu/focal64"
    ckan.vm.network "private_network", ip: "192.168.56.101"
    ckan.vm.synced_folder ".", "/home/vagrant/Ckan"
    ckan.disksize.size = '40GB'
    ckan.vm.hostname = 'Ckan'
    ckan.vm.provider "virtualbox" do |vb|
      #   # Display the VirtualBox GUI when booting the machine
      #   vb.gui = true
      #
      #   # Customize the amount of memory on the VM:
        vb.name = "Ckan" 
        vb.memory = "2048"
        vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant","1"]
      end
    $basicInstall = <<-SCRIPT
    sudo apt update -y && sudo apt upgrade -y && sudo apt dist-upgrade -y
    sudo apt install python3-pip -y
    #Installing Postgresql
    sudo apt install -y postgresql
    sudo sed -i '92,103s|md5|trust|g' /etc/postgresql/12/main/pg_hba.conf
    sudo systemctl restart postgres
    #Installing Network-Configuration Tools
    sudo apt install net-tools
    pip3 install requests ckanapi
    pip3 install python-dateutil
    
    SCRIPT
    
    $RInstall = <<-SCRIPT
    sudo touch /etc/apt/sources.list.d/R.list ; echo "deb https://cloud.r-project.org/bin/linux/ubuntu focal-cran40/" | sudo tee /etc/apt/sources.list.d/R.list
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 51716619E084   
    sudo apt update -y
    sudo apt install r-base -y
    sudo apt install libmysqlclient-dev -y 
    sudo apt install r-cran-rmysql -y
    SCRIPT
    
    $CkanInstall = <<-SCRIPT
    #Installation of Ckan 2.9: from https://docs.ckan.org/en/2.9/maintaining/installing/install-from-package.html
    sudo apt update -y && sudo apt upgrade -y
    sudo apt-get install -y nginx apache2 libapache2-mod-wsgi libpq5 redis-server git-core -y
    sudo apt install -y libpq5 redis-server nginx supervisor -y
    wget https://packaging.ckan.org/python-ckan_2.9-py3-focal_amd64.deb
    sudo dpkg -i *.deb
    sudo su - postgres 
    #Configuring Postgres
    sudo systemctl restart postgres
    sudo -Hiu postgres psql -l
    #sudo su - postgres 
    #createdb ckan_default
    psql -U postgres -h localhost -c "CREATE ROLE ckan_default WITH LOGIN PASSWORD 'password';"
    psql -U postgres -h localhost -c "CREATE DATABASE ckan_default;"
    psql -U postgres -h localhost -c "CREATE USER ckan_default WITH PASSWORD 'password';"
    psql -U postgres --no-password -h localhost -c "GRANT ALL PRIVILEGES ON DATABASE ckan_default TO ckan_default;"
    #Checking if roles and databases were made, and with appropriate measures.
    sudo -Hiu postgres psql -l
    sudo -u postgres createuser -S -D -R -P ckan_default
    sudo -u postgres createdb -O ckan_default ckan_default -E utf-8
        
    #Installing Solr
    sudo apt install -y solr-tomcat
    sudo sed -i 's/Connector port="8080"/Connector port="8983"/g' /etc/tomcat9/server.xml
    sudo mv /etc/solr/conf/schema.xml /etc/solr/conf/schema.xml.bak
    sudo ln -s /usr/lib/ckan/default/src/ckan/ckan/config/solr/schema.xml /etc/solr/conf/schema.xml
    sudo service tomcat9 restart
    sudo sed -i 's/#solr_url/solr_url/g' /etc/ckan/default/ckan.ini | printf "solr_url set"
    sudo sed -i 's|ckan.site_url =$|ckan.site_url = https://www.ckan.org|g' /etc/ckan/default/ckan.ini | printf "ckan.site_url set"
    sudo sed -i '5s|Listen [0-9]*|Listen 8081|g' /etc/apache2/ports.conf
    sudo ckan db init
    #Reloading Supervisor daemon
    sudo supervisorctl reload
    sudo supervisorctl status
    #Restart Apache and Nginx
    sudo systemctl restart apache2
    sudo systemctl restart nginx
    SCRIPT
    
    puts "Input the name of the Ckan User(enter none if you are done with this step): "
    input = STDIN.gets.chomp 
    $CkanAdminSetup = <<-SCRIPT
      
    #Setting up Ckan SysAdmin User
    if [ #{input} != none ]; then
      sudo ckan -c /etc/ckan/default/ckan.ini user add #{input} password=password email=#{input}@localhost 

      sudo ckan -c /etc/ckan/default/ckan.ini sysadmin add #{input} email=#{input}@localhost password=password name=#{input} 
    fi 
    
    # Enabling Datastore Extension 
    psql -U postgres -h localhost -c "CREATE USER datastore_default WITH LOGIN PASSWORD 'password';"
    sudo -u postgres createdb -O ckan_default datastore_default -E utf-8
        
    sudo -Hiu postgres psql -l
    
    sudo sed '122!d' /etc/ckan/default/ckan.ini | grep datastore 
    if [ $? = 1 ]; then
     sudo sed -i -e '122s|$| datastore|' -e '52,53s|#||' -e '52,53s|_default:[a-zA-Z0-9]*@|_default:password@|' /etc/ckan/default/ckan.ini
     sudo ckan -c /etc/ckan/default/ckan.ini datastore set-permissions | sudo -u postgres psql --set ON_ERROR_STOP=1
     #Restart Ckan
     sudo supervisorctl reload
     sudo supervisorctl status
     #Restart Apache and Nginx
     sudo systemctl restart apache2
     sudo systemctl restart nginx
    fi
    SCRIPT
    
    $SettingUpProject = <<-SCRIPT
    if [ #{input} != none ]; then
      sudo ckan sysadmin list | grep -n #{input} | cut -d "=" -f 4 | tee > apikey
      sudo sed -i "4s|def41a89-8b9f-4225-9637-b9a015aa4546|$(cat apikey)|" Ckan/ckan_data_imports/utility/config.py
      rm apikey

      #creating organizations
      #sed -i -e '149s|#||' -e '151s|create_|create_|' Ckan/#ckan_data_imports/init/init_ckan.py
      #python3 Ckan/ckan_data_imports/main.py init
      
      #creating packages
      #sed -i -e '150s|#||' -e '149s|create_|create_|' Ckan/ckan_data_imports/init/init_ckan.py
      #python3 Ckan/ckan_data_imports/main.py init

      #creating resources
      #sed -i -e '151s|#||' -e '150s|create_|create_|' Ckan/ckan_data_imports/init/init_ckan.py
      #python3 Ckan/#ckan_data_imports/main.py init

    fi  
    SCRIPT
    
      ckan.vm.provision "shell", inline: $basicInstall
      ckan.vm.provision :reload
      ckan.vm.provision "shell", inline: $RInstall
      ckan.vm.provision "shell", path: "setup.sh", privileged: false 
      ckan.vm.provision "shell", inline: $CkanInstall  
      ckan.vm.provision "shell", inline: $CkanAdminSetup 
      ckan.vm.provision "shell", inline: $SettingUpProject
    end 

    config.vm.define "web" do |web|
      web.vm.box = "ubuntu/focal64"
      web.vm.network "private_network", ip: "192.168.56.102"
      web.vm.synced_folder ".", "/home/vagrant/Web"
      web.disksize.size = '40GB'
      web.vm.hostname = 'Web'
      web.vm.provider "virtualbox" do |vb|
           vb.memory = "2048"
           vb.name= "Web"
           vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant","1"]
        end
        $rootScript = <<-SCRIPT
	      #meant for commands run by root
	      sudo apt update -y && sudo apt upgrade -y && sudo apt dist-upgrade -y > /dev/null 2>&1
        sudo apt install net-tools -y > /dev/null 2>&1
	      sudo apt install git -y > /dev/null 2>&1
        wget https://nodejs.org/dist/v16.17.0/node-v16.17.0-linux-x64.tar.xz
        sudo tar --strip-components 1 -xvJf node-v16.17.0-linux-x64.tar.xz --directory=/usr/local/
	      SCRIPT
  
        $userScript = <<-SCRIPT
	      cd /home/vagrant
        node -v
	      # Install node and other required elements
	      npm install express xss nodemailer ckan point-in-polygon easy-autocomplete jscoord @turf/turf @turf/hex-grid @turf/square-grid @awaitjs/express mustache-express
        SCRIPT
  
        web.vm.provision "shell", inline:  $rootScript 
        web.vm.provision "shell", inline: $userScript, privileged:false
      end
    end
