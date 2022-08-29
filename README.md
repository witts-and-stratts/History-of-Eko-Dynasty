# Website for the History of Eko Dynasty Book Project

### This project uses Gulp for bundling the various assets, Pug for HTML templating and Typescript for JS.

## Running the Project
To run the project, simply run ```yarn install``` or ```npm install``` then ```yarn start``` or ```npm start```

## Editing the template files
To edit the Pug template files used in generating the HTML pages, simply edit the pug files located in the ```src/pug``` directory. After editing, remember to run ```yarn start``` to run compiling and build steps.

## Paystack keys
This project requires paystack api keys to enable the purchase options. Setting the ```api```keys in the ```environment``` variable will select a particular key depending on the ```NODE_ENV``` mode selected. Available options for ```NODE_ENV``` are ```development``` and ```production```. When ```production``` is selected, the ```PAYSTACK_PUBLIC_KEY_PROD``` variable is used. When ```development``` is selected, the ```PAYSTACK_PUBLIC_KEY_TEST``` is used. 

See ```env.example``` to set the options. Remember to rename the file to .env.