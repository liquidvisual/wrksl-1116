/*
    VUE-JOBS-LISTING.JS - Last updated: 01.04.20

    NOTES:
        - https://codepen.io/liquidvisual/pen/ErNNbZ?editors=1011
        - https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
        - https://codepen.io/dannievinther/pen/exvOda, https://uxdesign.cc/position-stuck-96c9f55d9526

        <!-- build:js({src,.}) /assets/scripts/vue.js -->
        <script src="/node_modules/vue/dist/vue{% unless site.environment == 'development' %}.min{% endunless %}.js"></script>
        <!-- endbuild -->
        <script>Vue.config.productionTip = false;</script>
*/
//-----------------------------------------------------------------
// VARIABLES
//-----------------------------------------------------------------
//-----------------------------------------------------------------
// RUN
// must much exist first
//-----------------------------------------------------------------

if (document.getElementById('vue-jobs-listing-app')) {
    init();
}

//-----------------------------------------------------------------
// INIT
//-----------------------------------------------------------------

function init() {

    //-----------------------------------------------------------------
    // JOBS TABLE
    //-----------------------------------------------------------------

    Vue.component('jobs-table', {
        template: `
            <div class="table-responsive">
                <table class="table table-bordered">
                    <!-- <caption>Job Vacancies</caption> -->
                    <thead>
                        <tr>
                            <th
                                v-for="item in data[0]"
                                :key="'th-'+item"
                                scope="col"
                            >
                                <h4 class="mb-0">
                                    {{ item }}
                                </h4>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in data.slice(1)"
                            :key="'tr-'+item"
                        >
                            <td
                                v-for="item_n in item"
                                :key="'td-'+item_n"
                            >
                                {{ item_n }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `,
        props: {
            data: {
                type: Array,
                required: true
            }
        }
     });

    //-----------------------------------------------------------------
    // SELECT FILTER
    //-----------------------------------------------------------------

    Vue.component('select-filter', {
        template: `
            <select
                class="custom-select mb-3"
                :name="id"
                :filter-order="filterOrder"
                v-model="filterOrder"
                @change="$emit('input', filterOrder)"
            >
                <option
                    v-for="item in filters"
                    :value="item.value"
                    v-text="item.name"
                >
                </option>
            </select>
        `,
        props: {
            filters: {
                type: Array,
                required: true
            },
            id: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                filterOrder: 'All' // need this to init with
            }
        }
     });

    //-----------------------------------------------------------------
    // KEYWORD SEARCH
    //-----------------------------------------------------------------

    Vue.component('keyword-search', {
        template: `
            <input
                type="text"
                class="form-control mb-3"

                :name="id"
                :value="value"
                @input="$emit('input', $event.target.value)"
            >
        `,
        props: {
            id: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        },
     });

    //-----------------------------------------------------------------
    // APP
    //-----------------------------------------------------------------

    new Vue({
        el: '#vue-jobs-listing-app',
        data() {
            return {
                csvPath: null,
                jobsData: null, // parsed from CSV

                filterLocation: 'All',
                filterVacancyType: 'All',
                filterKeywords: '',
                filterLocations: '',

                locations: [
                    { name: 'All Locations', value: 'All' },
                    { name: 'Western Australia', value: 'WA' },
                    { name: 'South Australia', value: 'SA' },
                    { name: 'New South Wales', value: 'NSW' },
                    { name: 'Victoria', value: 'VIC' },
                ],
                vacancyTypes: [
                    { name: 'All Types', value: 'All' },
                    { name: 'Full-time', value: 'Full-time' },
                    { name: 'Part-time', value: 'Part-time' },
                    { name: 'Casual', value: 'Casual' },
                ]
            }
        },
        computed: {
            jobsDataFiltered() {

                let jobsData = this.jobsData;

                // LOCATION SELECT
                if (this.filterLocation !== 'All') {
                    jobsData = jobsData.filter((item, index) => {
                        if (index === 0 || item[1] && item[1].indexOf(this.filterLocation) !== -1) return item;
                    })
                }

                // VACANCY SELECT
                if (this.filterVacancyType !== 'All') {
                    jobsData = jobsData.filter((item, index) => {
                        if (index === 0 ||
                            item[2] && item[2].indexOf(this.filterVacancyType) !== -1 ||
                            this.filterVacancyType === 'Part-time' && item[2] && item[2].toLowerCase().indexOf('p/t') !== -1 ||
                            this.filterVacancyType === 'Full-time' && item[2] && item[2].toLowerCase().indexOf('f/t') !== -1
                        ) {
                            return item;
                        }
                    })
                }

                // SEARCH
                if (this.filterKeywords) {
                    jobsData = jobsData.filter((jobItem, index) => {
                        if (index === 0 ||
                            this.filterKeywords.toLowerCase().split(' ')
                            .every(keyword => (jobItem[0] && jobItem[0].toLowerCase().indexOf(keyword) !== -1))
                            // .every(keyword => jobItem.join(' ').toLowerCase().indexOf(keyword) !== -1)
                        ) {
                            console.log(jobItem)
                            return jobItem;
                        }
                    });
                }

                // LOCATIONS
                if (this.filterLocations) {
                    jobsData = jobsData.filter((jobItem, index) => {
                        if (index === 0 ||
                            this.filterLocations.toLowerCase().split(' ')
                            .every(keyword => (jobItem[1] && jobItem[1].toLowerCase().indexOf(keyword) !== -1))
                            // .every(keyword => jobItem.join(' ').toLowerCase().indexOf(keyword) !== -1)
                        ) {
                            console.log(jobItem)
                            return jobItem;
                        }
                    });
                }

                // Remove any empty data.
                jobsData = jobsData.filter(item => item[0].length);

                return jobsData;
            }
        },
        mounted() {
            // Read CSV path from attribute then parse file.
            this.csvPath = this.$el.getAttribute('data-csv-path');
            if (this.csvPath) this.parseCSV(this.csvPath);
        },
        methods: {
            parseCSV(url) {
                Papa.parse(url, {
                    download: true,
                    before: (file, inputElem) => {
                        // executed before parsing each file begins;
                        // what you return here controls the flow
                    },
                    error: (err, file, inputElem, reason) => {
                        // executed if an error occurs while loading the file,
                        // or if before callback aborted for some reason
                    },
                    complete: data => {
                        this.jobsData = data.data;
                    }
                });
            }
        }
    });
}

//-----------------------------------------------------------------
//
//-----------------------------------------------------------------
//==================================================
//
//==================================================