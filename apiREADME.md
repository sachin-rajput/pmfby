https://pmfby.gov.in/landingPage/calculatePremium?

sssyID=scheme+season+state+year
use sssyid + state id to get list of district id's
https://pmfby.gov.in/landingPage/districtState?stateID=277E6128-EFCC-4811-BBF1-0EECCCBE45CA&sssyID=04013017

=> data = {} or data = data.hierarchy.level3 - [] - level3ID

https://pmfby.gov.in/cropNotification/cropList?sssyID=04013017&districtID=level3ID

=> data = [] or data = [] . cropID

https://pmfby.gov.in/landingPage/calculatePremium?sssyID=04013017&districtID=level3ID&cropID=cropID

=> data = [] or data = [0].

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

districtID=did

sssyID=04012817&
districtID=95999621-2A44-4BDE-8224-9721A39EFBDC&
cropID=A0379BEC-93DB-480A-B62D-C22207DFA969

https://pmfby.gov.in/landingPage/districtState?stateID=277E6128-EFCC-4811-BBF1-0EECCCBE45CA&sssyID=04013017
https://pmfby.gov.in/cropNotification/cropList?sssyID=04013017&districtID=3FB47D7D-3AD9-4343-B5F6-E566CA325FA6
https://pmfby.gov.in/landingPage/calculatePremium?sssyID=04013017&districtID=3FB47D7D-3AD9-4343-B5F6-E566CA325FA6&cropID=610F134D-1DA8-47F1-BA2B-C067F7C51748

//// https://pmfby.gov.in/landingPage/calculatePremium?sssyID=04013017&districtID=level3ID&cropID=cropID
