/**
 * 1) The form has 6 data inputs (for land size it's always 1 acre so let's ignore that for now):
 *    - Season
 *    - Year
 *    - Scheme
 *    - State
 *    - District
 *    - Crop
 *
 * 2) Below are number of possibilities for Season, Year and Scheme:
 *    - Season: 2
 *    - Year: 3
 *    - Scheme: 2
 *
 * 3) There are three APIs to get our data, for the each of them we require something called as sssyID,
 *    which is formed as schemeid + seasonid + stateid + yearid
 *    For example:
 *      For Season "Kharif" for year "2017" for scheme "Pradhan Mantri Fasal Bima Yojana" and for state "Assam"
 *      the sssyID would be = "04011817" => in which,
 *      04 is for scheme, 01 is for season, 18 is for state and 17 is for year
 *
 *      Hence, with above explanation sssy array is created with XX in between which we will update later on for
 *      each state.
 *
 *
 */

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

const sssy =
  "0401xx17,0402xx17,0401xx18,0402xx18,0401xx19,0402xx19,0201xx17,0202xx17,0201xx18,0202xx18,0201xx19,0202xx19";

const sssyIDs = sssy.split(",");

const states = {
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

module.exports = {
  season,
  year,
  scheme,
  states,
  sssyIDs
};
