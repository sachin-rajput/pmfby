const reader = require("csv-parser");
const csvWriter = require("csv-write-stream");
const fs = require("fs");
const axios = require("axios");

// https://pmfby.gov.in/landingPage/calculatePremium?

// sssyID=scheme+season+state+year
// use sssyid + state id to get list of district id's
// https://pmfby.gov.in/landingPage/districtState?stateID=277E6128-EFCC-4811-BBF1-0EECCCBE45CA&sssyID=04013017

// => data = {} or data = data.hierarchy.level3 - [] - level3ID

// https://pmfby.gov.in/cropNotification/cropList?sssyID=04013017&districtID=level3ID

// => data = [] or data = [] . cropID

// https://pmfby.gov.in/landingPage/calculatePremium?sssyID=04013017&districtID=level3ID&cropID=cropID

// => data = [] or data = [0].

// {
//     "indemnityLevel": 80,
//     "premiumRate": 7,
//     "farmerShare": 2,
//     "farmerShareValue": 0,
//     "goiShareValue": 0,
//     "stateShareValue": 0,
//     "insuranceCompanyName": "SBI GENERAL INSURANCE",
//     "cutOfDate": 1501439400,
//     "sumInsured": 47500,
//     "stateShare": 2.5,
//     "goiShare": 2.5,
//     "tollFreeNumber": "18001232310",
//     "headQuaterAddress": "101,201,301, Natraj. Junction of Western express highway & Andheri - Kurla road. Andheri East Mumbai - 400069",
//     "headQuaterEmail": "crop.help@sbigeneral.in",
//     "websiteLink": "www.sbigeneral.in"
// }

// districtID=did

// sssyID=04012817&
// districtID=95999621-2A44-4BDE-8224-9721A39EFBDC&
// cropID=A0379BEC-93DB-480A-B62D-C22207DFA969

// https://pmfby.gov.in/landingPage/districtState?stateID=277E6128-EFCC-4811-BBF1-0EECCCBE45CA&sssyID=04013017
// https://pmfby.gov.in/cropNotification/cropList?sssyID=04013017&districtID=3FB47D7D-3AD9-4343-B5F6-E566CA325FA6
// https://pmfby.gov.in/landingPage/calculatePremium?sssyID=04013017&districtID=3FB47D7D-3AD9-4343-B5F6-E566CA325FA6&cropID=610F134D-1DA8-47F1-BA2B-C067F7C51748

const season = {
  "01": "Kharif",
  "02": "Rabi"
};

const year = {
  17: 2017,
  18: 2018,
  19: 2019
};

const scheme = {
  "04": "Pradhan Mantri Fasal Bima Yojana",
  "02": "Weather Based Crop Insurance Scheme"
};

const state = {
  "Andhra Pradesh": ["28", "091E88D9-332A-4169-81D5-9B01A867E886"],
  Assam: ["18", "966F786F-31CD-437F-B613-3430274407F2"],
  Bihar: ["10", "D784EEBC-979A-4BCF-813B-194F93908582"],
  Chhattisgarh: ["22", "2F3DE245-46E6-4C4D-9297-C0B23C803B15"],
  Goa: ["30", "277E6128-EFCC-4811-BBF1-0EECCCBE45CA"],
  Gujarat: ["24", "C3C7D9E1-1A72-4345-90CE-F3EF95643A4C"],
  Haryana: ["06", "5C77DA4F-BC9B-4099-BED7-15E06A45F376"],
  "Himachal Pradesh": ["02", "B7EB6AF0-CF11-4E6E-9456-624F3962629C"],
  "Jammu And Kashmir": ["01", "18691EED-BEB5-4D08-8E5F-E7C0FEC0F934"],
  Jharkhand: ["20", "635A659A-5B03-4DA2-832F-A7DE3490C162"],
  Kerala: ["32", "4A6C9793-C23A-45E1-8F92-6DA0AC644944"],
  "Madhya Pradesh": ["23", "6693A237-25BD-4446-91E3-F7F05F3B2B21"],
  Maharashtra: ["27", "5FB484F4-A27D-46BF-8368-81656DFBB157"],
  Meghalaya: ["17", "57CC16D0-F526-4DF4-A4AF-7A25929C06F1"],
  Odisha: ["21", "E27AC9FE-6359-4790-B433-3680B1B1B11F"],
  Rajasthan: ["08", "0A5BE76C-BDC2-4405-A32C-C46448FF136B"],
  Sikkim: ["11", "051D78A7-0BCF-42C3-AD76-F7EE6E4966A9"],
  Telangana: ["36", "20773CDE-D1B0-4338-9D32-43AB335CDA90"],
  Tripura: ["16", "6BB658DA-1E4F-445D-AFC1-1276C51FD906"],
  "Uttar Pradesh": ["09", "A3E1E1AD-A0F1-41F1-B557-741769808B77"],
  Uttarakhand: ["05", "74B7F070-19E4-4DA6-AF8F-263EE5A6021C"],
  "West Bengal": ["19", "12522F0F-1B0D-4DA6-8150-A3C55ACD8B65"]
};

const sssy =
  "0401xx17,0402xx17,0401xx18,0402xx18,0401xx19,0402xx19,0201xx17,0202xx17,0201xx18,0202xx18,0201xx19,0202xx19";

const sssyIDs = sssy.split(",");

// const csvWriter = createCsvWriter({
//   path: "output/data.csv",
//   header: [
//     { id: "season", title: "Season" },
//     { id: "year", title: "Year" },
//     { id: "scheme", title: "Scheme" },
//     { id: "state", title: "State" },
//     { id: "district", title: "District" },
//     { id: "crop", title: "Crop" },
//     { id: "insurance_comp", title: "Insurance Company" },
//     { id: "sum_insured", title: "Sum Insured" },
//     { id: "farmer_share", title: "Farmer Share" },
//     { id: "acturial_rate", title: "Acturial rate" },
//     { id: "cut_off_date", title: "Cut Off Date" },
//     { id: "area", title: "Area" },
//     { id: "premium_paid_farmer", title: "Farmer Premium" },
//     { id: "premium_paid_goi", title: "GOI Premium" }
//   ],
//   append: true
// });

const finalPathFile = "output/data.csv";

if (!fs.existsSync(finalPathFile))
  writer = csvWriter({
    headers: [
      "season",
      "year",
      "scheme",
      "state",
      "district",
      "crop",
      "insurance_comp",
      "sum_insured",
      "farmer_share",
      "acturial_rate",
      "cut_off_date",
      "area",
      "premium_paid_farmer",
      "premium_paid_goi"
    ]
  });
else writer = csvWriter({ sendHeaders: false });

writer.pipe(fs.createWriteStream(finalPathFile, { flags: "a" }));

const loadData = async () => {
  //   let data = [];

  sssyIDs.map(async sssyID => {
    const schemeID = sssyID.substring(0, 2);
    const seasonID = sssyID.substring(2, 4);
    const yearID = sssyID.substr(-2);
    Object.entries(state).map(async value => {
      const stateSerial = value[1][0];
      const stateID = value[1][1];
      const stateName = value[0][0];
      //   console.log(schemeID + seasonID + stateSerial + yearID);
      const sssy_id = schemeID + seasonID + stateSerial + yearID;
      const districts = await getDistrictList(stateID, sssy_id);
      //   console.log(districts.data.data);
      if (districts.data.data && districts.data.data.hierarchy) {
        const dist = districts.data.data.hierarchy.level3;
        // console.log(`District : ${dist.length}`);
        dist.map(async district => {
          const dID = district.level3ID;
          const dName = district.level3Name;
          //   console.log(dID);
          const crops = await getCropList(dID, sssy_id);
          //   console.log(crops.data);
          if (crops.data.data.length > 0) {
            // console.log(
            //   `Crops: ${crops.data.data.length} | District ID: ${dID}`
            // );
            const cropsData = crops.data.data;
            cropsData.map(async crop => {
              const crop_id = crop.cropID;
              const crop_name = crop.cropName;
              const premiumData = await getPremium(dID, crop_id, sssy_id);
              if (premiumData.data.data.length > 0) {
                const premium = premiumData.data.data[0];
                // console.log(
                //   `Crops: ${crop_id} | District ID: ${dID} | ins.cmp: ${premium.insuranceCompanyName}`
                // );

                const dataR = {
                  season: season[seasonID],
                  year: year[yearID],
                  scheme: scheme[schemeID],
                  state: stateName,
                  district: dName,
                  crop: crop_name,
                  insurance_comp: premium.insuranceCompanyName,
                  sum_insured: premium.sumInsured,
                  farmer_share: premium.farmerShare,
                  acturial_rate: premium.premiumRate,
                  cut_off_date: premium.cutOfDate,
                  area: 1,
                  premium_paid_farmer:
                    (premium.sumInsured * premium.farmerShare) / 100,
                  premium_paid_goi:
                    (premium.sumInsured * premium.premiumRate) / 100
                };

                console.log(dataR);

                writer.write(dataR);
              }
            });
          }
        });
      }
      //   .then(response => {
      //     if (response.data.data && response.data.data.hierarchy !== {}) {
      //       if (response.data.data.hierarchy)
      //         console.log(response.data.data.hierarchy.level3.length);
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    });
  });

  //   let loadAlldata = await Promise.all(data);

  //   csvWriter
  //     .writeRecords(loadAlldata)
  //     .then(() => console.log("The CSV file was written successfully"));
  //   console.log("done!");
  //   return data;
};

async function getDistrictList(stateID, sssyID) {
  const response = await axios({
    url: `https://pmfby.gov.in/landingPage/districtState?stateID=${stateID}&sssyID=${sssyID}`,
    method: "get"
  });
  return response;
}

async function getCropList(districtID, sssyID) {
  const response = await axios({
    url: `https://pmfby.gov.in/cropNotification/cropList?districtID=${districtID}&sssyID=${sssyID}`,
    method: "get"
  });
  return response;
}

async function getPremium(districtID, cropID, sssyID) {
  const response = await axios({
    url: `https://pmfby.gov.in/landingPage/calculatePremium?districtID=${districtID}&sssyID=${sssyID}&cropID=${cropID}`,
    method: "get"
  });
  return response;
}

loadData();

//// https://pmfby.gov.in/landingPage/calculatePremium?sssyID=04013017&districtID=level3ID&cropID=cropID

// const data = [
//   {
//     name: "John",
//     surname: "Snow",
//     age: 26,
//     gender: "M"
//   },
//   {
//     name: "Clair",
//     surname: "White",
//     age: 33,
//     gender: "F"
//   },
//   {
//     name: "Fancy",
//     surname: "Brown",
//     age: 78,
//     gender: "F"
//   }
// ];
