# AirPollutionDataPlatform

This repository contains the following elements:

- ckan_data_imports: folder containing the Python module which collects, cleans, sorts and transforms data and insert it into the CKAN DataStore
- website: folder containing the code of the newly created air quality website
- feedback_questionnaire_answers: spreadsheet containing the answers to the feedback questionnaire. The feedback questionnaire can be found at the following [link](https://docs.google.com/forms/d/e/1FAIpQLSeOTNNV6iTue6j-o9aMiTcl8vxpfcmScJ_fAiKe0oZNFHkpPA/viewform?usp=sf_link)

## Setup the Air Pollution Data Platform

We would need to setup two virtual machines.

One machine to setup CKAN and one to setup the website.

## Setup CKAN

Refer [Setup_CKAN](./docs/setup_ckan.md)

## Setup Website

Refer [Setup_WebSite](./docs/setup_website.md)

## Setup Through Vagrant

1. Install Vagrant from https://www.vagrantup.com/

2. Install Vagrant plugin "vagrant-disksize" and "vagrant-reload" by running 
 > vagrant plugin install vagrant-disksize 
 > vagrant plugin install vagrant-reload 

3. Run Vagrantfile in the home folder/.
 > Vagrant up"  

However, it is suggested to provision both machines separately by typing.
> vagrant up ckan

and
> vagrant up web

4. Perform rest of the configuration, i.e. all other steps other than that of installation of basic services. 