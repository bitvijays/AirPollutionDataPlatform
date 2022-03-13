
const unitsID = "a51e90d8-6dbf-47f2-8f03-601b5d3f466a";
const areas = [{
    area: "Bristol",
    center: [-2.6, 51.47],
    groupID: "0b9917a5-1310-476f-9741-ef0dcb8bdf68",
    lastData: {
        necessaryFields:"76e67ed1-2cfb-4424-b2ac-5cc17e2b4374",
        pointIDS: {
            Yearly:"10434ec9-f2a7-4848-b204-2fba554c11a6", 
            Daily:"ba6546ae-f26d-4dde-ac4f-b7ca8941d2d5",
            Hourly:"ca8f3db3-8159-4975-bc17-f089753ec2ea"
        },
        polygonIDS: {
            Yearly: "7a91bb0b-2415-45dc-921f-ef1b53357eb2"
        }
    },
    polygon: [
        [
            -2.8784179687499996,
            51.36406405506362
        ],
        [
            -2.4629974365234375,
            51.36406405506362
        ],
        [
            -2.4629974365234375,
            51.57749625888323
        ],
        [
            -2.8784179687499996,
            51.57749625888323
        ],
        [
            -2.8784179687499996,
            51.36406405506362
        ]
    ]
}//,
/*{
    area: "London",
    center: [-0.129, 51.505],
    groupID: "350f430f-8487-4a09-a193-d4f5652d644e",
    lastData: {
        necessaryFields: "262940a0-7d73-4eb4-abf5-a7711cc025b5",
        pointIDS: {
            Daily: "06f747ed-0b42-4350-8aef-bd761589b3f8",
            Hourly: "341031b0-8fee-469a-accc-b1dccc1d738c"
        }
    },
    polygon: [
        [
            -0.6207275390625,
            51.17417731875822
        ],
        [
            0.3570556640625,
            51.17417731875822
        ],
        [
            0.3570556640625,
            51.81201099369774
        ],
        [
            -0.6207275390625,
            51.81201099369774
        ],
        [
            -0.6207275390625,
            51.17417731875822
        ]
    ]
}*/];

const eu_aqi = [{
    name: "pm25",
    index_levels: [{
        name: "Good",
        values: [0, 10],
        color: "#50f0e6"
    }, {
        name: "Fair",
        values: [10, 20],
        color: "#50ccaa"
    }, {
        name: "Moderate",
        values: [20, 25],
        color: "#f0e641"
    }, {
        name: "Poor",
        values: [25, 50],
        color: "#ff5050"
    }, {
        name: "Very Poor",
        values: [50, 800],
        color: "#960032"
    }]
}, {
    name: "pm10",
    index_levels: [{
        name: "Good",
        values: [0, 20],
        color: "#50f0e6"
    }, {
        name: "Fair",
        values: [20, 35],
        color: "#50ccaa"
    }, {
        name: "Moderate",
        values: [35, 50],
        color: "#f0e641"
    }, {
        name: "Poor",
        values: [50, 100],
        color: "#ff5050"
    }, {
        name: "Very Poor",
        values: [100, 1200],
        color: "#960032"
    }]
}, {
    name: "no2",
    index_levels: [{
        name: "Good",
        values: [0, 40],
        color: "#50f0e6"
    }, {
        name: "Fair",
        values: [40, 100],
        color: "#50ccaa"
    }, {
        name: "Moderate",
        values: [100, 200],
        color: "#f0e641"
    }, {
        name: "Poor",
        values: [200, 400],
        color: "#ff5050"
    }, {
        name: "Very Poor",
        values: [400, 1000],
        color: "#960032"
    }]
}, {
    name: "o3",
    index_levels: [{
        name: "Good",
        values: [0, 80],
        color: "#50f0e6"
    }, {
        name: "Fair",
        values: [80, 120],
        color: "#50ccaa"
    }, {
        name: "Moderate",
        values: [120, 180],
        color: "#f0e641"
    }, {
        name: "Poor",
        values: [180, 240],
        color: "#ff5050"
    }, {
        name: "Very Poor",
        values: [240, 600],
        color: "#960032"
    }]
}, {
    name: "so2",
    index_levels: [{
        name: "Good",
        values: [0, 100],
        color: "#50f0e6"
    }, {
        name: "Fair",
        values: [100, 200],
        color: "#50ccaa"
    }, {
        name: "Moderate",
        values: [200, 350],
        color: "#f0e641"
    }, {
        name: "Poor",
        values: [350, 500],
        color: "#ff5050"
    }, {
        name: "Very Poor",
        values: [500, 1250],
        color: "#960032"
    }]
}]

module.exports =  { unitsID : unitsID , areas : areas, eu_aqi : eu_aqi}
