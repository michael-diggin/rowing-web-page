[![Build Status](https://travis-ci.org/michael-diggin/rowing-web-page.svg?branch=master)](https://travis-ci.org/michael-diggin/rowing-web-page)
# Rowing Classifier
Rowing Classifier is a web page that classifies the type of rowing boat in a user uploaded image. 

This is the user interface to access a deployed machine learning model. This repo contains the source code for the frontend only, built using Node.js and some jQuery. The web server connects to a REST API from [this repo](https://github.com/michael-diggin/rowing_api) when an image is uploaded and displays the prediction. 

The underlying deep learning model was built and trained using Tensorflow and can be found [here](https://github.com/mdiggin/rowing-classifier). It uses transfer learning and is based on top of the VGG16 model. 
