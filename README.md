# PMFBY Data Extraction Tool for Premiums

### Installation

git clone https://github.com/sachin-rajput/pmfby.git

```
  cd pmfby
  npm install
  node loadData.js

```

#### "output" folder should have the data.csv file

### Calculate Premium

```
https://pmfby.gov.in/landingPage/calculatePremium?sssyID=04013017&districtID=districtID&cropID=cropID
```

Response (JSON):

```
{
    "indemnityLevel": 80,
    "premiumRate": 7,
    "farmerShare": 2,
    "farmerShareValue": 0,
    "goiShareValue": 0,
    "stateShareValue": 0,
    "insuranceCompanyName": "SBI GENERAL INSURANCE",
    "cutOfDate": 1501439400,
    "sumInsured": 47500,
    "stateShare": 2.5,
    "goiShare": 2.5,
    "tollFreeNumber": "18001232310",
    "headQuaterAddress": "101,201,301, Natraj. Junction of Western express highway & Andheri - Kurla road. Andheri East Mumbai - 400069",
    "headQuaterEmail": "crop.help@sbigeneral.in",
    "websiteLink": "www.sbigeneral.in"
}

```

### Find Crops for a district

```
https://pmfby.gov.in/cropNotification/cropList?sssyID=04013017&districtID=3FB47D7D-3AD9-4343-B5F6-E566CA325FA6
```

    Above API will return list of crops for a district

### Find Districts for a state

```
https://pmfby.gov.in/landingPage/districtState?stateID=277E6128-EFCC-4811-BBF1-0EECCCBE45CA&sssyID=04013017
```

    Above API will return list of districts for a state, season, scheme and a year (sssyID)

##### Example flow:

```
https://pmfby.gov.in/landingPage/districtState?stateID=277E6128-EFCC-4811-BBF1-0EECCCBE45CA&sssyID=04013017
https://pmfby.gov.in/cropNotification/cropList?sssyID=04013017&districtID=3FB47D7D-3AD9-4343-B5F6-E566CA325FA6
https://pmfby.gov.in/landingPage/calculatePremium?sssyID=04013017&districtID=3FB47D7D-3AD9-4343-B5F6-E566CA325FA6&cropID=610F134D-1DA8-47F1-BA2B-C067F7C51748
```
