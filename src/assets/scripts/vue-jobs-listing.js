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
            <div>
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
                                    v-for="(item_n, index) in item"
                                    :key="'td-'+item_n"
                                >
                                    <div v-if="index === 0">
                                        <label class="d-inline-block custom-control custom-checkbox mb-0">
                                            <input
                                                class="custom-control-input"
                                                name="Job Vacancy"
                                                type="checkbox"
                                                :value="{ jobRef: item[4], jobTitle: item_n, jobLocation: item[1] }"
                                                v-model="checkedJobs"
                                            >
                                            <span class="custom-control-label pl-1">
                                                {{ item_n }}
                                            </span>
                                        </label>
                                    </div>
                                    <div v-else>
                                        <span>{{ item_n }}</span>
                                    </div>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- EXPRESS INTEREST -->
                <transition
                    enter-active-class="animated slideInUp"
                    leave-active-class="animated slideOutDown"
                >
                    <div
                        v-if="checkedJobs.length"
                        class="jobs-table-submit"
                        :class="{ 'has-error': checkedLimitReached }"
                    >
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col-md-6 text-center text-md-left">

                                    <!-- CHECKED LIMIT WARNING -->
                                    <span
                                        v-if="checkedLimitReached"
                                        class="d-inline-block warning-msg mb-2 mb-md-0 shake animated"
                                    >
                                        <span>
                                            <i class="fa fa-exclamation-triangle mr-1"></i> The maximum selection is 5
                                        </span>
                                    </span>

                                </div>
                                <div class="col-md-6 text-center text-md-right">

                                    <!-- EXPRESS INTEREST -->
                                    <button
                                        type="submit"
                                        class="font-weight-bold btn btn-primary"
                                        :disabled="checkedLimitReached"
                                        @click="onSubmit()"
                                    >
                                        Express interest
                                        <i class="pl-5 fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </transition>

            </div>
        `,
        props: {
            data: {
                type: Array,
                required: true
            },
            jobFormPath: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                checkedJobs: [],
                checkedLimit: 5,
                checkedLimitReached: null
            }
        },
        computed: {
            outputURL() {
                let query = '';

                this.checkedJobs.forEach((item, index) => {
                    const operator = index === 0 ? '?' : '&';
                    const jobTitle = encodeURIComponent(item.jobTitle.trim());
                    const jobLocation = encodeURIComponent(item.jobLocation.trim());
                    const jobRef = encodeURIComponent(item.jobRef.trim());
                    query += `${operator}jobtitle${index+1}=${jobTitle}&jobLocation${index+1}=${jobLocation}&jobref${index+1}=${jobRef}`;
                });

                return this.jobFormPath + query;
            }
        },
        watch: {
            checkedJobs() {
                this.checkedLimitReached = this.checkedJobs.length > this.checkedLimit;
            }
        },
        methods: {
            onSubmit() {
                if (!this.checkedLimitReached) {
                    const url = this.outputURL;
                    this.checkedJobs = [];
                    window.location = url;
                }
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
                jobFormPath: '',

                filterLocation: 'All',
                filterVacancyType: 'All',
                filterKeywords: '',
                filterLocations: '',

                locations: [
                    { name: 'All Locations', value: 'All' },
                    { name: 'Western Australia', value: 'WA' },
                    { name: 'South Australia', value: 'SA' },
                    { name: 'Queensland', value: 'QLD' },
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
                            // console.log(jobItem)
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

            // Fill in job path for the title hyperlinks.
            this.jobFormPath = this.$el.getAttribute('data-job-form-path');
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