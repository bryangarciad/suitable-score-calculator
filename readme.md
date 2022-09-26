<a name="readme-top"></a>



<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="https://global-uploads.webflow.com/60242ee565b2be8b567a2237/6055265de6ed4ea50b4fced8_PS%20Logo%20Header%20Dark.png" alt="Logo" width="180" height="80">


  <h3 align="center">Ramses Garcia Code Challenge</h3>


</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<h5>Platform Science Code Exercise </h5 <br/>
Our sales team has just struck a deal with Acme Inc to become the exclusive provider for routing their product shipments via 3rd party trucking
fleets. The catch is that we can only route one shipment to one driver per day.
Each day we get the list of shipment destinations that are available for us to offer to drivers in our network. Fortunately our team of highly trained
data scientists have developed a mathematical model for determining which drivers are best suited to deliver each shipment.
<br/>
<br/>
With that hard work done, now all we have to do is implement a program that assigns each shipment destination to a given driver while maximizing the total suitability of all shipments to all drivers.
<br/>
<br/>
The top-secret algorithm is:
<br/>
<ul>
<li>If the length of the shipment's destination street name is even, the base suitability score (SS) is the number of vowels in the driver’s
name multiplied by 1.5.</li>
<li>If the length of the shipment's destination street name is odd, the base SS is the number of consonants in the driver’s name multiplied by
1.</li>
<li>If the length of the shipment's destination street name shares any common factors (besides 1) with the length of the driver’s name, the SS is increased by 50% above the base SS.</li>
</ul>

Write an application in the language of your choice that assigns shipment destinations to drivers in a way that maximizes the total SS over the set
of drivers. Each driver can only have one shipment and each shipment can only be offered to one driver. Your program should run on the
command line and take as input two newline separated files, the first containing the street addresses of the shipment destinations and the second
containing the names of the drivers. The output should be the total SS and a matching between shipment destinations and drivers. You do not
need to worry about malformed input, but you should certainly handle both upper and lower case names.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

<ul>
<li>Node.js</li>
<li>TypeScript</li>
</ul>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
Instructions to sett up project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
* node

Detail expalanation on how to install for windows, mac and linux here https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac#mac


### Installation


2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run following command
   ```js
   npm run start_cli "path_to_file_with_destination_list" "path_to_file_with_drivers_list
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use the following command to run the script; The first argument for the command must be the destination list file, and the second argument must be the drivers list file. 
   ```js
   npm run start_cli "path_to_file_with_destination_list" "path_to_file_with_drivers_list
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

