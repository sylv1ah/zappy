# Zappy README

![](https://i.imgur.com/zIdHyaF.png)

```Created with love and affection by 
@jokosanyang - Scrum master 
@fweddi - Quality Assurance
@seabasshoang - DevOps
```

---
 
## Overview

**Selected theme:**
> Finance 

There are numerous spending apps available which track your daily, weekly or monthly habits, but we believe that the key to helping people save money and become aware of the effects of everyday spending is to help them make a more informed decision **before** the money leaves their account.
The aim of our submission is to educate consumers about the effect of fast fashion on their finances at the **point of sale**. 

In order to achieve this, we developed a Chrome web extension which enhances your clothes shopping experience. Once added to your browser, the Zappy bar helpfully appears at the top of your window when you click onto a fashion product page, and using the average lifetime of an item of clothing, the item type and the price, it calculates the **cost per wear**.

### Current sites supported
- hm.com
- asos.com,
- nike.com,
- uniqlo.com,
- shein.com,
- macys.com,
- nordstrom.com,
- zappos.com,
- boohoo.com

This enables shoppers to make a more informed decision when buying that new pair of shoes.
If they disagree with the average, they can simply slide the terrapin to indicate how often they will wear the shoes and how many years they expect them to last, and receive an updated calculation.
For it to be able to be adopted all over the world, we have added a currency converter and a translation API which tracks the mention of items of clothing in several languages.


In the future, we hope to develop it further to make it work cross-browser and support even more fashion sites.

**This web extension is available to download from the Chrome Web Store: https://chrome.google.com/webstore/detail/zappy/ejceghnmgiembcbacnnoepnakkjbemab**

--- 

## User journey 
**Main user journey:**
- As a user, I want to improve my spending habits by buying clothes that are a good investment.

**User stories:**
- As a user, I want to save money in the long run while supporting a sustainable fashion industry.
- As a user, I want to know the lifetime of the clothes I buy.
- As a user, I want to input my own prediction for the item's lifetime to see cost per wear.

**Stretch goals:**
- As a user, I would like to use the extension in a browser of my choice.
- As a user, I want to use the extension on any fashion site.

---

## Process

### Planning
Our first step was to brainstorm ideas for the three possible themes of the hackathon. After selecting our theme and idea, we developed it further by discussing our core desired features and sketching out design ideas. 

![](https://i.imgur.com/gu0MoK9.jpg)
![](https://i.imgur.com/odUH2J9.jpg)
![](https://i.imgur.com/Wfz0MMt.jpg)

We agreed on the user journeys, name and tagline of the extension and then planned the build.

### Build sprint 
Our goal was to finalise the design and complete a very minimal viable product(MVP). After planning, we broke the  project down into tasks and created GitHub issues to work on. Most of the work was done remotely, communicating via Slack throughout the project.

![](https://i.imgur.com/tlL8rkj.jpg)

---

## Issues faced (and conquered)

* learning how to make a web extension
	* we had to start off by doing a lot of research and building little sample apps to get to grips with the new web app format
* instructing the extension to work only on fashion pages
	* figuring out how to limit the action of the extension took longer than expected
* working remotely 
	* as our first experience of working across countries and timezones, regular communication was **key**
* CircleCI
	* the integration would push the updates to the web store, but we did not realise that the web store required 5-7 days to approve any changes to an extension

---

## Technologies used
- HTML
- CSS
- JavaScript
- CircleCI
- Chrome Web Store