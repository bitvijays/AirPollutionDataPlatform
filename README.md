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

2. Install Vagrant plugin " vagrant-disksize" by running 
 > vagrant plugin install vagrant-disksize



4. Run Vagrantfiles in Vagrant-Setup/Ckan/Vagrantfile and /Vagrant-Setup/Web/Vagrantfile. 