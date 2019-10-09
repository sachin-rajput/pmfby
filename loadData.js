const csvWriter = require("csv-write-stream");
const fs = require("fs");

// Holds logic for the 3 API's
const api = require("./api");

// Holds logic for the data from all dropdowns on the form
const formData = require("./formData");

// The output file to which the data would be dumped
const outputPath = "output/data.csv";

/**
 * This function initializes the output file with the header
 */
const initializeFile = () => {
  let writer;

  if (!fs.existsSync(outputPath))
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

  writer.pipe(fs.createWriteStream(outputPath, { flags: "a" }));

  return writer;
};

/**
 * This function loads the data to the output file bu using all the form data and 3 API calls
 */
const loadData = async writer => {
  // For all combination of sssy from formData, read comment 3
  // Total entries in sssyIDs = 12 (2 season x 3 years x 2 scheme)
  formData.sssyIDs.map(async sssyID => {
    const schemeID = sssyID.substring(0, 2);
    const seasonID = sssyID.substring(2, 4);
    const yearID = sssyID.substr(-2);

    // For each entry from above sssyIDs, i.e (12 x 22 states)
    // this would be 12 x 22 = 264 combinations
    Object.entries(formData.states).map(async value => {
      const stateSerial = value[1][0];
      const stateID = value[1][1];
      const stateName = value[0];

      const sssy_id = schemeID + seasonID + stateSerial + yearID;

      // For each state let's see if there are any district(s) which has above combination,

      // i.e if for a particular season, year, scheme and a state => a set of districts exists
      // for this below API needs:
      //    stateid like - B7EB6AF0-CF11-4E6E-9456-624F3962629C
      //    sssy_id which looks like 04011817
      const districts = await api.getDistrictList(stateID, sssy_id);

      // If only and if district exists for each district we move forward
      if (districts.data.data && districts.data.data.hierarchy) {
        // extracting the district array from the above API response
        const dist = districts.data.data.hierarchy.level3;

        // let's loop over the array for all districts
        dist.map(async district => {
          // let's extarct district ID for each district
          const dID = district.level3ID;

          // let's extarct district name for each district
          const dName = district.level3Name;

          // Now for each district we need to see how many crops it has,
          // for this we use below API call which needs:
          //    districtid like - B7EB6AF0-CF11-4E6E-9456-624F3962629C
          //    sssy_id which looks like 04011817
          const crops = await api.getCropList(dID, sssy_id);

          // if and only if we have at least 1 crop we move forward
          if (crops.data.data.length > 0) {
            // let's extract the crop data from above response from the api
            const cropsData = crops.data.data;

            // Let's go over each crop and we now have all 6 inputs
            cropsData.map(async crop => {
              const crop_id = crop.cropID;
              const crop_name = crop.cropName;

              // finally call the calculate premium api with districtid, cropid and sssy_id
              // sssy_id already has 4 inputs
              const premiumData = await api.getPremium(dID, crop_id, sssy_id);

              // Let's extract necessary data elements from the response if the data has at least one entry
              if (premiumData.data.data.length > 0) {
                const premium = premiumData.data.data[0];

                // creating the entrire row with all necessary values,

                // also computing the premium farmers and goi will pay as follows:
                // premium_paid_farmer = (premium.sumInsured * premium.farmerShare) / 100
                // premium_paid_goi = (premium.sumInsured * premium.premiumRate) / 100

                const dataR = {
                  season: formData.season[seasonID],
                  year: formData.year[yearID],
                  scheme: formData.scheme[schemeID],
                  state: stateName,
                  district: dName,
                  crop: crop_name,
                  insurance_comp: premium.insuranceCompanyName,
                  sum_insured: premium.sumInsured,
                  farmer_share: premium.farmerShare,
                  acturial_rate: premium.premiumRate,
                  cut_off_date: new Date(
                    premium.cutOfDate * 1000
                  ).toLocaleString(),
                  area: 1,
                  premium_paid_farmer:
                    (premium.sumInsured * premium.farmerShare) / 100,
                  premium_paid_goi:
                    (premium.sumInsured *
                      (premium.premiumRate - premium.farmerShare)) /
                    100
                };

                console.log(dataR);

                // Let's add this row in our csv file
                writer.write(dataR);
              }
            });
          }
        });
      }
    });
  });
};

// Initialize the file and return the handle to the csv file
let writer = initializeFile();

// Load the data to above writer which is a handle to the data.csv file
loadData(writer);
