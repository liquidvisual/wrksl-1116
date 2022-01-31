/*
    VUE-CUSTOMER-PROFILE.JS - Last updated: 24.09.21
*/
//-----------------------------------------------------------------
// RUN - MUST EXIST ON PAGE TO RUN
//-----------------------------------------------------------------

if (document.getElementById('vue-customer-profile-app')) {
    initCustomerProfileApp();
}

//-----------------------------------------------------------------
// INIT
//-----------------------------------------------------------------

function initCustomerProfileApp() {

    const customerProfileBus = new Vue();

    // IE11
    // https://stackoverflow.com/questions/45849831/object-entries-alternative-for-internet-explorer-and-reactjs
    // if (!Object.entries) {
    //     Object.entries = function(obj) {
    //         return Object.keys(obj).reduce(function(arr, key) {
    //             arr.push([key, obj[key]]);
    //             return arr;
    //         }, []);
    //     }
    // }

    //-----------------------------------------------------------------
    // STEP 1. INDUSTRIES TABLE
    //-----------------------------------------------------------------

    Vue.component('industries-table', {
        template: `
            <div>
                <label :class="{ 'mb-4': !checkedIndustries.length }">
                    Please select up to {{ checkedLimit }} industries.
                </label>

                <!-- YOUR SELECTIONS -->
                <div v-if="checkedIndustries.length" class="mb-4">
                    <button
                        v-for="(item, index) in checkedIndustries"
                        :key="item.industry"
                        class="badge badge-pill badge-primary mr-1"
                        title="Remove"
                        @click="removeItem(index)"
                    >
                       <i class="fa fa-close mr-1"></i> {{ item.industry }}
                    </button>
                </div>

                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>
                                    <h4 class="mb-0">
                                        Industry
                                    </h4>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in data"
                                :key="'td-'+item+index"
                            >
                                <td>
                                    <div>
                                        <label class="d-inline-block custom-control custom-checkbox mb-0">
                                            <input
                                                class="custom-control-input"
                                                name="industry"
                                                type="checkbox"
                                                :value="{ industry: item }"
                                                v-model="checkedIndustries"
                                            >
                                            <span class="custom-control-label pl-1">
                                                {{ item }}
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- FORM NAVIGATOR -->
                <div
                    class="jobs-table-submit"
                    :class="{ 'has-error': isCheckedLimitReached }"
                >
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-md-6 text-center text-md-left">

                                <!-- CHECKED LIMIT WARNING -->
                                <span
                                    v-if="isCheckedLimitReached"
                                    class="d-inline-block warning-msg mb-2 mb-md-0 shake animated"
                                >
                                    <span>
                                        <i class="fa fa-exclamation-triangle mr-1"></i> The maximum selection is {{ checkedLimit }}
                                    </span>
                                </span>

                            </div>
                            <div class="col-md-6 text-center text-md-right">

                                <!-- NEXT -->
                                <button
                                    type="submit"
                                    class="font-weight-bold btn btn-primary"
                                    :disabled="!canProceed"
                                    @click="handleNext()"
                                >
                                    Next
                                    <i class="pl-5 fa fa-angle-right"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `,
        props: {
            data: {
                type: Array,
                required: true
            },
        },
        data() {
            return {
                checkedIndustries: [],
                checkedLimit: 5
            }
        },
        computed: {
            canProceed() {
                return !this.isCheckedLimitReached;
            },
            isCheckedLimitReached() {
                return this.checkedIndustries.length > this.checkedLimit;
            },
            outputParams() {
                return this.checkedIndustries.reduce((acc, item, index) => {
                    const industry = encodeURIComponent(item.industry.trim());
                    acc += `&industry${index+1}=${industry}`;
                    return acc;
                }, '');
            }
        },
        watch: {
            outputParams() {
                this.$emit('output', this.outputParams);
            }
        },
        methods: {
            removeItem(index) {
                this.checkedIndustries.splice(index, 1);
            },
            handleNext() {
                customerProfileBus.$emit('nextStep');
            },
        }
     });

    //-----------------------------------------------------------------
    // STEP 2. JOBS TABLE
    //-----------------------------------------------------------------

    Vue.component('jobs-table', {
        template: `
            <div>
                <label :class="{ 'mb-4': !checkedJobs.length }">
                    Please select up to {{ checkedLimit }} jobs by selecting the suitability level next to the job.
                </label>

                <!-- YOUR SELECTIONS -->
                <div v-if="checkedJobs.length" class="mb-4">
                    <button
                        v-for="(item, index) in checkedJobs"
                        :key="item.name"
                        class="badge badge-pill mr-1"
                        :class="item.suitability ? 'badge-primary' : 'badge-dark'"
                        title="Remove"
                        @click="removeItem(index)"
                    >
                       <i class="fa fa-close mr-1"></i>
                       {{ item.name }}
                       <i v-if="!item.suitability"  class="fa fa-spinner mx-1"></i>
                    </button>
                </div>

                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>
                                    <h4 class="mb-0">
                                        Job Title
                                    </h4>
                                </th>
                                <th style="border-right: none">
                                    <h4 class="mb-0">
                                        Suitability Level
                                    </h4>
                                </th>
                                <th style="border-left: none">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in dataFormatted"
                                :key="'tr-'+index+item"
                            >
                                <td>
                                    {{ item.name }}
                                </td>
                                <td>
                                    <div>
                                        <label class="d-inline-block custom-control custom-radio mb-0">
                                            <input
                                                class="custom-control-input customer-profile-radio-input"
                                                :name="item.name+'-'+item.suitability"
                                                type="checkbox"
                                                :value="{ name: item.name, suitability: 'isSuitable' }"
                                                v-model="checkedJobs"
                                                @change="selectJob(item.name, 'isSuitable')"
                                            >
                                            <span class="custom-control-label pl-1">
                                                Suitable
                                            </span>
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <label class="d-inline-block custom-control custom-radio mb-0">
                                            <input
                                                class="custom-control-input customer-profile-radio-input"
                                                :name="item.name+'-'+item.suitability"
                                                type="checkbox"
                                                :value="{ name: item.name, suitability: 'isTrainingRequired' }"
                                                v-model="checkedJobs"
                                                @change="selectJob(item.name, 'isTrainingRequired')"
                                            >
                                            <span class="custom-control-label pl-1">
                                                Training Required
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- FORM NAVIGATOR -->
                <div
                    class="jobs-table-submit"
                    :class="{ 'has-error': isCheckedLimitReached }"
                >
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-md-6 text-center text-md-left">

                                <!-- CHECKED LIMIT WARNING -->
                                <span
                                    v-if="isCheckedLimitReached"
                                    class="d-inline-block warning-msg mb-2 mb-md-0 shake animated"
                                >
                                    <span>
                                        <i class="fa fa-exclamation-triangle mr-1"></i> The maximum selection is {{ checkedLimit }}
                                    </span>
                                </span>

                            </div>
                            <div class="col-md-6 text-center text-md-right">

                                <!-- BACK -->
                                <button
                                    class="font-weight-bold btn btn-primary px-4 mr-4"
                                    @click="handlePrev()"
                                >
                                    <i class="mr-2 fa fa-angle-left"></i>Back
                                </button>

                                <!-- NEXT -->
                                <button
                                    class="font-weight-bold btn btn-primary px-4"
                                    :disabled="!canProceed"
                                    @click="handleNext()"
                                >
                                    Next<i class="ml-2 fa fa-angle-right"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `,
        props: {
            data: {
                type: Array,
                required: true
            },
        },
        data() {
            return {
                checkedJobs: [],
                checkedLimit: 5,
            }
        },
        computed: {
            canProceed() {
                return this.isCheckedSuitable && !this.isCheckedLimitReached;
            },
            dataFormatted() {
                return this.data.map(item => ({ name: item, suitability: false }));
            },
            isCheckedLimitReached() {
                return this.checkedJobs.length > this.checkedLimit;
            },
            isCheckedSuitable() {
                return !this.checkedJobs.length ||
                this.checkedJobs.length === this.checkedJobs.filter(job => job.suitability).length;
            },
            outputParams() {
                return this.checkedJobs.reduce((acc, item, index) => {
                    const jobTitle = encodeURIComponent(item.name.trim());
                    const isSuitable = item && item.suitability === "isSuitable";
                    const isTrainingRequired = item && item.suitability === "isTrainingRequired";

                    if (isSuitable || isTrainingRequired) {
                        acc += `&jobTitle${index+1}=${jobTitle}`;
                    }
                    if (isSuitable) {
                        acc += `&isSuitable${index+1}=true`;
                    }
                    if (isTrainingRequired) {
                        acc += `&isTrainingRequired${index+1}=true`;
                    }
                    return acc;
                }, '');
            },
        },
        watch: {
            outputParams() {
                this.$emit('output', this.outputParams);
            }
        },
        methods: {
            handleNext() {
                customerProfileBus.$emit('nextStep');
            },
            handlePrev() {
                customerProfileBus.$emit('prevStep');
            },
            removeItem(index) {
                this.checkedJobs.splice(index, 1);
            },
            selectJob(name, suitability) {
                this.checkedJobs.forEach(job => {
                    const jobSelectedInSameGroup = job.name === name && job.suitability !== suitability;
                    if (jobSelectedInSameGroup) {
                        this.checkedJobs = this.checkedJobs.filter(item => item !== job);
                    }
                });
            }
        }
     });

    //-----------------------------------------------------------------
    // STEP 3. EDUCATION MODULE
    //-----------------------------------------------------------------

    Vue.component('education-module', {
        template: `
            <div>
                <div
                    v-for="(item, index) in courseItems"
                    :key="item.id"
                    class="row"
                >
                    <div class="col-sm-12 col-md-3 col-xl-2">

                        <!-- QUALIFICATION TYPE SELECT -->
                        <label for="qualification-type">
                            Qualification Type
                        </label>

                        <select-filter
                            id="qualification-type"
                            class="mb-0"
                            :filters="data.qualifications"
                            v-model="courseItems[index].qualificationType"
                        />
                    </div>

                    <div class="col-sm-12 col-md-2 col-xl-2">

                        <!-- COURSE NAME SELECT -->
                        <label for="course-name">
                            Course Name
                        </label>

                        <select-filter
                            id="course-name"
                            class="mb-0"
                            :filters="data.courses"
                            :disabled="!courseItems[index].qualificationType"
                            v-model="courseItems[index].courseName"
                        />

                    </div>
                    <div class="col-sm-12 col-md-2 col-xl-2">

                        <!-- INSTITUTION -->
                        <label for="institution">Institution</label>

                        <keyword-search
                            id="institution"
                            v-model="courseItems[index].institution"
                            :disabled="!courseItems[index].qualificationType"
                        />

                    </div>
                    <div class="col-sm-12 col-md-2 col-xl-2">

                        <!-- COMPLETED -->
                        <label for="completed-status">Completed?</label>

                        <select-filter
                            id="completed-status"
                            :filters="optionsCompleted"
                            :disabled="!courseItems[index].qualificationType"
                            v-model="courseItems[index].completed"
                        />

                    </div>
                    <div class="col-sm-12 col-md-3 col-xl-4">

                    <label class="d-block invisible hidden-sm-down">Add / Remove</label>

                        <!-- REMOVE -->
                        <button
                            v-if="courseItems.length > 1"
                            class="btn btn-danger px-0 mb-4 mr-2 text-center"
                            @click="removeCourseItem(index)"
                        >
                            <i class="fa fa-trash m-0 px-3"></i>
                        </button>

                        <!-- ADD -->
                        <button
                            v-if="index === courseItems.length - 1"
                            class="btn btn-primary font-weight-bold text-center mb-4"
                            :disabled="!courseItems[index].qualificationType"
                            @click="addCourseItem()"
                        >
                            <i class="fa fa-plus m-0 mr-2"></i> Add More
                        </button>

                    </div>
                </div>

                <!-- FORM NAVIGATOR -->
                <div
                    class="jobs-table-submit"
                    :class="{ 'has-error': false }"
                >
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-md-6 text-center text-md-left">

                                <!-- CHECKED LIMIT WARNING -->
                                <span
                                    v-if="false"
                                    class="d-inline-block warning-msg mb-2 mb-md-0 shake animated"
                                >
                                    <span>
                                        <i class="fa fa-exclamation-triangle mr-1"></i> This is an error.
                                    </span>
                                </span>

                            </div>
                            <div class="col-md-6 text-center text-md-right">

                                <!-- BACK -->
                                <button
                                    class="font-weight-bold btn btn-primary px-4 mr-4"
                                    @click="handlePrev()"
                                >
                                    <i class="mr-2 fa fa-angle-left"></i>Back
                                </button>

                                <!-- NEXT -->
                                <button
                                    class="font-weight-bold btn btn-primary px-4"
                                    :disabled="!canProceed"
                                    @click="handleNext()"
                                >
                                    Next<i class="ml-2 fa fa-angle-right"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `,
        props: {
            data: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                courseItems: [],
                optionsCompleted: [
                    { name: 'Yes', value: 'Yes' },
                    { name: 'No', value: 'No' },
                    { name: 'Deferred', value: 'Deferred' },
                    { name: 'In Progress', value: 'In Progress' }
                ],
            }
        },
        computed: {
            canProceed() {
                return (this.courseItems.length === 1 && !this.courseItems[0].qualificationType) || this.courseItems.length === this.courseItems.filter(item => {
                    return item.qualificationType &&
                        item.courseName &&
                        item.institution &&
                        item.completed;
                }).length;
            },
            outputParams() {
                return this.courseItems.reduce((acc, item, index) => {
                    const qualificationType = encodeURIComponent(item.qualificationType.trim());
                    const courseName = encodeURIComponent(item.courseName.trim());
                    const institution = encodeURIComponent(item.institution.trim());
                    const completed = encodeURIComponent(item.completed.trim());

                    if (qualificationType && courseName && institution && completed) {
                        acc += `&qualificationType${index+1}=${qualificationType}`;
                        acc += `&courseName${index+1}=${courseName}`;
                        acc += `&institution${index+1}=${institution}`;
                        acc += `&completed${index+1}=${completed}`;
                    }
                    return acc;
                }, '');
            },
        },
        watch: {
            outputParams() {
                this.$emit('output', this.outputParams);
            }
        },
        created() {
            this.addCourseItem();
        },
        methods: {
            addCourseItem() {
                this.courseItems.push({
                    id: this.generateId(),
                    qualificationType: '',
                    courseName: '',
                    institution: '',
                    completed: ''
                })
            },
            generateId() {
                return Date.now() + Math.floor(Math.random() * 5);
            },
            removeCourseItem(index) {
                this.courseItems.splice(index, 1);
            },
            handleNext() {
                customerProfileBus.$emit('nextStep');
            },
            handlePrev() {
                customerProfileBus.$emit('prevStep');
            }
        }
     });

    //-----------------------------------------------------------------
    // STEP 4. LICENCES TABLE
    //-----------------------------------------------------------------

    Vue.component('licences-table', {
        template: `
            <div>
                <!-- YOUR SELECTIONS -->
                <div v-if="checkedItems.length" class="mb-4">
                    <label class="d-block">Your selections:</label>
                    <button
                        v-for="(item, index) in checkedItems"
                        :key="item.licence"
                        class="badge badge-pill badge-primary mr-1"
                        title="Remove"
                        @click="removeItem(index)"
                    >
                       <i class="fa fa-close mr-1"></i> {{ item.licence }}
                    </button>
                </div>

                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>
                                    <h4 class="mb-0">
                                        Licence
                                    </h4>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in data"
                                :key="item+index"
                            >
                                <td>
                                    <div>
                                        <label class="d-inline-block custom-control custom-checkbox mb-0">
                                            <input
                                                class="custom-control-input"
                                                name="licence"
                                                type="checkbox"
                                                :value="{ licence: item }"
                                                v-model="checkedItems"
                                            >
                                            <span class="custom-control-label pl-1">
                                                {{ item }}
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- FORM NAVIGATOR -->
                <div
                    class="jobs-table-submit"
                    :class="{ 'has-error': false }"
                >
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-md-6 text-center text-md-left">
                            </div>
                            <div class="col-md-6 text-center text-md-right">

                                <!-- BACK -->
                                <button
                                    class="font-weight-bold btn btn-primary px-4 mr-4"
                                    @click="handlePrev()"
                                >
                                    <i class="mr-2 fa fa-angle-left"></i>Back
                                </button>

                                <!-- NEXT -->
                                <button
                                    class="font-weight-bold btn btn-primary px-4"
                                    @click="handleNext()"
                                >
                                    Next<i class="ml-2 fa fa-angle-right"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `,
        props: {
            data: {
                type: Array,
                required: true
            },
        },
        data() {
            return {
                checkedItems: []
            }
        },
        computed: {
            outputParams() {
                return this.checkedItems.reduce((acc, item, index) => {
                    const licenceName = encodeURIComponent(item.licence.trim());
                    acc += `&licence${index+1}=${licenceName}`;
                    return acc;
                }, '');
            },
            checkedItemsList() {
                return this.checkedItems.map(item => item.licence).join(", ")
            }
        },
        watch: {
            outputParams() {
                this.$emit('output', this.outputParams);
            }
        },
        methods: {
            removeItem(index) {
                this.checkedItems.splice(index, 1);
            },
            handleNext() {
                customerProfileBus.$emit('nextStep');
            },
            handlePrev() {
                customerProfileBus.$emit('prevStep');
            }
        }
     });

    //-----------------------------------------------------------------
    // STEP 5. SKILLS TABLE
    //-----------------------------------------------------------------

    Vue.component('skills-table', {
        template: `
            <div>
                <!-- YOUR SELECTIONS -->
                <div v-if="checkedItems.length" class="mb-4">
                    <label class="d-block">Your selections:</label>
                    <button
                        v-for="(item, index) in checkedItems"
                        :key="item.skill"
                        class="badge badge-pill badge-primary mr-1"
                        title="Remove"
                        @click="removeItem(index)"
                    >
                       <i class="fa fa-close mr-1"></i> {{ item.skill }}
                    </button>
                </div>

                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>
                                    <h4 class="mb-0">
                                        Skill
                                    </h4>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in data"
                                :key="item+index"
                            >
                                <td>
                                    <div>
                                        <label class="d-inline-block custom-control custom-checkbox mb-0">
                                            <input
                                                class="custom-control-input"
                                                name="skill"
                                                type="checkbox"
                                                :value="{ skill: item }"
                                                v-model="checkedItems"
                                            >
                                            <span class="custom-control-label pl-1">
                                                {{ item }}
                                            </span>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- FORM NAVIGATOR -->
                <div
                    class="jobs-table-submit"
                    :class="{ 'has-error': false }"
                >
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-md-6 text-center text-md-left">
                            </div>
                            <div class="col-md-6 text-center text-md-right">

                                <!-- BACK -->
                                <button
                                    class="font-weight-bold btn btn-primary px-4 mr-4"
                                    @click="handlePrev()"
                                >
                                    <i class="mr-2 fa fa-angle-left"></i>Back
                                </button>

                                <!-- NEXT -->
                                <button
                                    class="font-weight-bold btn btn-primary px-4"
                                    @click="handleNext()"
                                >
                                    Next<i class="ml-2 fa fa-angle-right"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `,
        props: {
            data: {
                type: Array,
                required: true
            },
        },
        data() {
            return {
                checkedItems: []
            }
        },
        computed: {
            outputParams() {
                return this.checkedItems.reduce((acc, item, index) => {
                    const skillName = encodeURIComponent(item.skill.trim());
                    acc += `&skill${index+1}=${skillName}`;
                    return acc;
                }, '');
            },
            checkedItemsList() {
                return this.checkedItems.map(item => item.skill).join(", ")
            }
        },
        watch: {
            outputParams() {
                this.$emit('output', this.outputParams);
            }
        },
        methods: {
            removeItem(index) {
                this.checkedItems.splice(index, 1);
            },
            handleNext() {
                customerProfileBus.$emit('nextStep');
            },
            handlePrev() {
                customerProfileBus.$emit('prevStep');
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
        el: '#vue-customer-profile-app',
        data() {
            return {
                csvData: {},

                currentStep: 1,
                maxSteps: 5,

                filterKeywordsIndustries: '',
                filterKeywordsJobs: '',
                filterKeywordsLicences: '',
                filterKeywordsSkills: '',
                filterLicenceType: 'All',
                filterSkillType: 'All',

                redirectPath: '',
                isDevToolActive: true,
                step1Params: '',
                step2Params: '',
                step3Params: '',
                step4Params: '',
                step5Params: '',
            }
        },
        computed: {
            finalQueryString() {
                return this.redirectPath + `?data=${!!this.hasData}` + this.step1Params + this.step2Params + this.step3Params + this.step4Params + this.step5Params;
            },
            hasData() {
                return this.step1Params || this.step2Params || this.step3Params || this.step4Params || this.step5Params;
            },
            industriesFiltered() {
                let data = this.csvData && this.csvData.industries && this.csvData.industries.filter(industry => industry[0] !== "Industry").map(arr => arr[0]) || [];

                // SEARCH
                if (this.filterKeywordsIndustries) {
                    data = data.filter((item, index) => {
                        return (this.filterKeywordsIndustries.toLowerCase().split(' ')
                            .every(keyword => (item && item.toLowerCase().indexOf(keyword) !== -1))
                        );
                    });
                }
                return data;
            },
            jobsFiltered() {
                let data = this.csvData && this.csvData.jobs && this.csvData.jobs.filter(job => job[0] !== "Job Title").map(arr => arr[0]) || [];

                // SEARCH
                if (this.filterKeywordsJobs) {
                    data = data.filter((item, index) => {
                        return (this.filterKeywordsJobs.toLowerCase().split(' ')
                            .every(keyword => (item && item.toLowerCase().indexOf(keyword) !== -1))
                        );
                    });
                }
                return data || [];
            },
            qualificationsFiltered() {
                return this.csvData && this.csvData.qualifications && this.csvData.qualifications.map((item) => {
                    return { name: item[0], value: item[0] };
                }).slice(1) || [];
            },
            coursesFiltered() {
                return this.csvData && this.csvData.courses && this.csvData.courses.filter(course => course[0] !== "Course Title" && course[0] !== "Course" && course[0] !== "Course Name").map((item) => {
                    return { name: item[0], value: item[0] };
                }).slice(1) || [];
            },
            licenceTypes() {
                return this.csvData && this.csvData.licences && this.csvData.licences.reduce((acc, item, index) => {
                    if (index !== 0 && !acc.find(licence => licence.name === item[0])) {
                        acc.push({ name: item[0], value: item[0] });
                    }
                    return acc;
                }, [{ name: 'All Types', value: 'All' }]) || [];
            },
            licencesFiltered() {
                let licenceData = this.csvData && this.csvData.licences && this.csvData.licences.filter(licence => licence[0] !== "Group");

                // LICENCE TYPE SELECT
                if (this.filterLicenceType !== 'All') {
                    licenceData = licenceData.filter((item, index) => {
                        return item[0] === this.filterLicenceType;
                    });
                }

                // SEARCH
                if (this.filterKeywordsLicences) {
                    licenceData = licenceData.filter((licence, index) => {
                        return (licence && this.filterKeywordsLicences && this.filterKeywordsLicences.toLowerCase().split(' ')
                            .every(keyword => licence.join(' ').toLowerCase().indexOf(keyword) !== -1)
                        );
                    });
                }
                return licenceData && licenceData.map(item => item[1]) || [];
            },
            skillTypes() {
                return this.csvData && this.csvData.skills && this.csvData.skills.reduce((acc, item, index) => {
                    if (index !== 0 && !acc.find(skill => skill.name === item[0])) {
                        acc.push({ name: item[0], value: item[0] });
                    }
                    return acc;
                }, [{ name: 'All Types', value: 'All' }]) || [];
            },
            skillsFiltered() {
                let skillData = this.csvData && this.csvData.skills && this.csvData.skills.filter(skill => skill[0] !== "Group");

                // SKILL TYPE SELECT
                if (this.filterSkillType !== 'All') {
                    skillData = skillData.filter((item, index) => {
                        return item[0] === this.filterSkillType;
                    });
                }

                // SEARCH
                if (this.filterKeywordsSkills) {
                    skillData = skillData.filter((skill, index) => {
                        return (skill && this.filterKeywordsSkills && this.filterKeywordsSkills.toLowerCase().split(' ')
                            .every(keyword => skill.join(' ').toLowerCase().indexOf(keyword) !== -1)
                        );
                    });
                }
                return skillData && skillData.map(item => item[1]) || [];
            },
        },
        created() {
            customerProfileBus.$on('nextStep', () => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                if (this.currentStep < this.maxSteps) {
                    this.currentStep += 1;
                } else {
                    window.location = this.finalQueryString;
                }
            });
            customerProfileBus.$on('prevStep', () => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                if (this.currentStep > 1) {
                    this.currentStep -= 1;
                }
            });
        },
        mounted() {
            const csvPaths = {
                courses: this.$el.getAttribute('data-csv-courses'),
                industries: this.$el.getAttribute('data-csv-industries'),
                jobs: this.$el.getAttribute('data-csv-jobs'),
                licences: this.$el.getAttribute('data-csv-licences'),
                qualifications: this.$el.getAttribute('data-csv-qualifications'),
                skills: this.$el.getAttribute('data-csv-skills'),
            };

            this.parseCSV(csvPaths);

            this.redirectPath = this.$el.getAttribute('data-redirect-path');
        },
        methods: {
            parseCSV(paths) {
                for (const [key, value] of Object.entries(paths)) {
                    Papa.parse(value, {
                        download: true,
                        complete: (data) => {
                            const fullDataOnly = data.data.filter((item) => item[0]);
                            Vue.set(this.csvData, key, fullDataOnly);
                        },
                        error: (err, file, inputElem, reason) => {
                          alert(`Oops! There was a CSV parsing error with ${key}.csv. Please ensure the format is correct and try again. Additional info: ${err}.`);
                        },
                    });
                }
            }
        }
    });
}