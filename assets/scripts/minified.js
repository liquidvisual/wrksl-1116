var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function init() {
    Vue.component("jobs-table", { template: "\n            <div>\n                <div class=\"table-responsive\">\n                    <table class=\"table table-bordered\">\n                        <!-- <caption>Job Vacancies</caption> -->\n                        <thead>\n                            <tr>\n                                <th\n                                    v-for=\"item in data[0]\"\n                                    :key=\"'th-'+item\"\n                                    scope=\"col\"\n                                >\n                                    <h4 class=\"mb-0\">\n                                        {{ item }}\n                                    </h4>\n                                </th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr\n                                v-for=\"item in data.slice(1)\"\n                                :key=\"'tr-'+item\"\n                            >\n                                <td\n                                    v-for=\"(item_n, index) in item\"\n                                    :key=\"'td-'+item_n\"\n                                >\n                                    <div v-if=\"index === 0\">\n                                        <label class=\"d-inline-block custom-control custom-checkbox mb-0\">\n                                            <input\n                                                class=\"custom-control-input\"\n                                                name=\"Job Vacancy\"\n                                                type=\"checkbox\"\n                                                :value=\"{ jobRef: item[4], jobTitle: item_n, jobLocation: item[1] }\"\n                                                v-model=\"checkedJobs\"\n                                            >\n                                            <span class=\"custom-control-label pl-1\">\n                                                {{ item_n }}\n                                            </span>\n                                        </label>\n                                    </div>\n                                    <div v-else>\n                                        <span>{{ item_n }}</span>\n                                    </div>\n\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n                <!-- EXPRESS INTEREST -->\n                <transition\n                    enter-active-class=\"animated slideInUp\"\n                    leave-active-class=\"animated slideOutDown\"\n                >\n                    <div\n                        v-if=\"checkedJobs.length\"\n                        class=\"jobs-table-submit\"\n                        :class=\"{ 'has-error': checkedLimitReached }\"\n                    >\n                        <div class=\"container\">\n                            <div class=\"row align-items-center\">\n                                <div class=\"col-md-6 text-center text-md-left\">\n\n                                    <!-- CHECKED LIMIT WARNING -->\n                                    <span\n                                        v-if=\"checkedLimitReached\"\n                                        class=\"d-inline-block warning-msg mb-2 mb-md-0 shake animated\"\n                                    >\n                                        <span>\n                                            <i class=\"fa fa-exclamation-triangle mr-1\"></i> The maximum selection is 5\n                                        </span>\n                                    </span>\n\n                                </div>\n                                <div class=\"col-md-6 text-center text-md-right\">\n\n                                    <!-- EXPRESS INTEREST -->\n                                    <button\n                                        type=\"submit\"\n                                        class=\"font-weight-bold btn btn-primary\"\n                                        :disabled=\"checkedLimitReached\"\n                                        @click=\"onSubmit()\"\n                                    >\n                                        Express interest\n                                        <i class=\"pl-5 fa fa-angle-right\"></i>\n                                    </button>\n                                </div>\n                            </div>\n\n                        </div>\n                    </div>\n                </transition>\n\n            </div>\n        ", props: { data: { type: Array, required: !0 }, jobFormPath: { type: String, default: "" } }, data: function data() {
            return { checkedJobs: [], checkedLimit: 5, checkedLimitReached: null };
        },
        computed: {
            outputURL: function outputURL() {
                var r = "";return this.checkedJobs.forEach(function (e, t) {
                    var i = 0 === t ? "?" : "&",
                        n = encodeURIComponent(e.jobTitle.trim()),
                        o = encodeURIComponent(e.jobLocation.trim()),
                        e = encodeURIComponent(e.jobRef.trim());r += i + "jobtitle" + (t + 1) + "=" + n + "&jobLocation" + (t + 1) + "=" + o + "&jobref" + (t + 1) + "=" + e;
                }), this.jobFormPath + r;
            }
        }, watch: {
            checkedJobs: function checkedJobs() {
                this.checkedLimitReached = this.checkedJobs.length > this.checkedLimit;
            }
        }, methods: {
            onSubmit: function onSubmit() {
                var e;this.checkedLimitReached || (e = this.outputURL, this.checkedJobs = [], window.location = e);
            }
        } }), Vue.component("select-filter", { template: "\n            <select\n                class=\"custom-select mb-3\"\n                :name=\"id\"\n                :filter-order=\"filterOrder\"\n                v-model=\"filterOrder\"\n                @change=\"$emit('input', filterOrder)\"\n            >\n                <option\n                    v-for=\"item in filters\"\n                    :value=\"item.value\"\n                    v-text=\"item.name\"\n                >\n                </option>\n            </select>\n        ", props: { filters: { type: Array, required: !0 }, id: { type: String, required: !0 } }, data: function data() {
            return { filterOrder: "All" };
        }
    }), Vue.component("keyword-search", { template: "\n            <input\n                type=\"text\"\n                class=\"form-control mb-3\"\n\n                :name=\"id\"\n                :value=\"value\"\n                @input=\"$emit('input', $event.target.value)\"\n            >\n        ", props: { id: { type: String, required: !0 }, value: { type: String, required: !0 } } }), new Vue({ el: "#vue-jobs-listing-app", data: function data() {
            return { csvPath: null, jobsData: null, jobFormPath: "", filterLocation: "All", filterVacancyType: "All", filterKeywords: "", filterLocations: "", locations: [{ name: "All Locations", value: "All" }, { name: "Western Australia", value: "WA" }, { name: "South Australia", value: "SA" }, { name: "Queensland", value: "QLD" }, { name: "New South Wales", value: "NSW" }, { name: "Victoria", value: "VIC" }], vacancyTypes: [{ name: "All Types", value: "All" }, { name: "Full-time", value: "Full-time" }, { name: "Part-time", value: "Part-time" }, { name: "Casual", value: "Casual" }] };
        },
        computed: {
            jobsDataFiltered: function jobsDataFiltered() {
                var _this = this;

                var e = this.jobsData;return "All" !== this.filterLocation && (e = e.filter(function (e, t) {
                    if (0 === t || e[1] && -1 !== e[1].indexOf(_this.filterLocation)) return e;
                })), "All" !== this.filterVacancyType && (e = e.filter(function (e, t) {
                    if (0 === t || e[2] && -1 !== e[2].indexOf(_this.filterVacancyType) || "Part-time" === _this.filterVacancyType && e[2] && -1 !== e[2].toLowerCase().indexOf("p/t") || "Full-time" === _this.filterVacancyType && e[2] && -1 !== e[2].toLowerCase().indexOf("f/t")) return e;
                })), this.filterKeywords && (e = e.filter(function (t, e) {
                    if (0 === e || _this.filterKeywords.toLowerCase().split(" ").every(function (e) {
                        return t[0] && -1 !== t[0].toLowerCase().indexOf(e);
                    })) return t;
                })), this.filterLocations && (e = e.filter(function (t, e) {
                    if (0 === e || _this.filterLocations.toLowerCase().split(" ").every(function (e) {
                        return t[1] && -1 !== t[1].toLowerCase().indexOf(e);
                    })) return t;
                })), e = e.filter(function (e) {
                    return e[0].length;
                }), e;
            }
        }, mounted: function mounted() {
            this.csvPath = this.$el.getAttribute("data-csv-path"), this.csvPath && this.parseCSV(this.csvPath), this.jobFormPath = this.$el.getAttribute("data-job-form-path");
        },
        methods: {
            parseCSV: function parseCSV(e) {
                var _this2 = this;

                Papa.parse(e, { download: !0, before: function before(e, t) {}, error: function error(e, t, i, n) {}, complete: function complete(e) {
                        _this2.jobsData = e.data;
                    } });
            }
        } });
}function init() {
    var e = new Vue();Vue.component("industries-table", { template: "\n            <div>\n                <label :class=\"{ 'mb-4': !checkedIndustries.length }\">\n                    Please select up to {{ checkedLimit }} industries.\n                </label>\n\n                <!-- YOUR SELECTIONS -->\n                <div v-if=\"checkedIndustries.length\" class=\"mb-4\">\n                    <button\n                        v-for=\"(item, index) in checkedIndustries\"\n                        :key=\"item.industry\"\n                        class=\"badge badge-pill badge-primary mr-1\"\n                        title=\"Remove\"\n                        @click=\"removeItem(index)\"\n                    >\n                       <i class=\"fa fa-close mr-1\"></i> {{ item.industry }}\n                    </button>\n                </div>\n\n                <div class=\"table-responsive\">\n                    <table class=\"table table-bordered\">\n                        <thead>\n                            <tr>\n                                <th>\n                                    <h4 class=\"mb-0\">\n                                        Industry\n                                    </h4>\n                                </th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr\n                                v-for=\"(item, index) in data\"\n                                :key=\"'td-'+item+index\"\n                            >\n                                <td>\n                                    <div>\n                                        <label class=\"d-inline-block custom-control custom-checkbox mb-0\">\n                                            <input\n                                                class=\"custom-control-input\"\n                                                name=\"industry\"\n                                                type=\"checkbox\"\n                                                :value=\"{ industry: item }\"\n                                                v-model=\"checkedIndustries\"\n                                            >\n                                            <span class=\"custom-control-label pl-1\">\n                                                {{ item }}\n                                            </span>\n                                        </label>\n                                    </div>\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n                <!-- FORM NAVIGATOR -->\n                <div\n                    class=\"jobs-table-submit\"\n                    :class=\"{ 'has-error': isCheckedLimitReached }\"\n                >\n                    <div class=\"container\">\n                        <div class=\"row align-items-center\">\n                            <div class=\"col-md-6 text-center text-md-left\">\n\n                                <!-- CHECKED LIMIT WARNING -->\n                                <span\n                                    v-if=\"isCheckedLimitReached\"\n                                    class=\"d-inline-block warning-msg mb-2 mb-md-0 shake animated\"\n                                >\n                                    <span>\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i> The maximum selection is {{ checkedLimit }}\n                                    </span>\n                                </span>\n\n                            </div>\n                            <div class=\"col-md-6 text-center text-md-right\">\n\n                                <!-- NEXT -->\n                                <button\n                                    type=\"submit\"\n                                    class=\"font-weight-bold btn btn-primary\"\n                                    :disabled=\"!canProceed\"\n                                    @click=\"handleNext()\"\n                                >\n                                    Next\n                                    <i class=\"pl-5 fa fa-angle-right\"></i>\n                                </button>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n        ", props: { data: { type: Array, required: !0 } }, data: function data() {
            return { checkedIndustries: [], checkedLimit: 5 };
        },
        computed: {
            canProceed: function canProceed() {
                return !this.isCheckedLimitReached;
            },
            isCheckedLimitReached: function isCheckedLimitReached() {
                return this.checkedIndustries.length > this.checkedLimit;
            },
            outputParams: function outputParams() {
                return this.checkedIndustries.reduce(function (e, t, i) {
                    return e += "&industry" + (i + 1) + "=" + encodeURIComponent(t.industry.trim());
                }, "");
            }
        }, watch: {
            outputParams: function outputParams() {
                this.$emit("output", this.outputParams);
            }
        }, methods: {
            removeItem: function removeItem(e) {
                this.checkedIndustries.splice(e, 1);
            },
            handleNext: function handleNext() {
                e.$emit("nextStep");
            }
        } }), Vue.component("jobs-table", { template: "\n            <div>\n                <label :class=\"{ 'mb-4': !checkedJobs.length }\">\n                    Please select up to {{ checkedLimit }} industries.\n                </label>\n\n                <!-- YOUR SELECTIONS -->\n                <div v-if=\"checkedJobs.length\" class=\"mb-4\">\n                    <button\n                        v-for=\"(item, index) in checkedJobs\"\n                        :key=\"item.name\"\n                        class=\"badge badge-pill mr-1\"\n                        :class=\"item.suitability ? 'badge-primary' : 'badge-dark'\"\n                        title=\"Remove\"\n                        @click=\"removeItem(index)\"\n                    >\n                       <i class=\"fa fa-close mr-1\"></i>\n                       {{ item.name }}\n                       <i v-if=\"!item.suitability\"  class=\"fa fa-spinner mx-1\"></i>\n                    </button>\n                </div>\n\n                <div class=\"table-responsive\">\n                    <table class=\"table table-bordered\">\n                        <thead>\n                            <tr>\n                                <th>\n                                    <h4 class=\"mb-0\">\n                                        Job Title\n                                    </h4>\n                                </th>\n                                <th style=\"border-right: none\">\n                                    <h4 class=\"mb-0\">\n                                        Suitability Level\n                                    </h4>\n                                </th>\n                                <th style=\"border-left: none\">\n                                </th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr\n                                v-for=\"(item, index) in dataFormatted\"\n                                :key=\"'tr-'+index+item\"\n                            >\n                                <td>\n                                    <label class=\"d-inline-block custom-control custom-checkbox mb-0\">\n                                        <input\n                                            class=\"custom-control-input\"\n                                            name=\"jobTitle\"\n                                            type=\"checkbox\"\n                                            :value=\"item\"\n                                            v-model=\"checkedJobs\"\n                                        >\n                                        <span class=\"custom-control-label pl-1\">\n                                            {{ item.name }}\n                                        </span>\n                                    </label>\n                                </td>\n                                <td>\n                                    <div>\n                                        <label class=\"d-inline-block custom-control custom-radio mb-0\">\n                                            <input\n                                                class=\"custom-control-input customer-profile-radio-input\"\n                                                :disabled=\"!checkedJobs.find(job => job.name === item.name)\"\n                                                :name=\"'suitability'+index\"\n                                                type=\"radio\"\n                                                value=\"isSuitable\"\n                                                v-model=\"item.suitability\"\n                                            >\n                                            <span class=\"custom-control-label pl-1\">\n                                                Suitable\n                                            </span>\n                                        </label>\n                                    </div>\n                                </td>\n                                <td>\n                                    <div>\n                                        <label class=\"d-inline-block custom-control custom-radio mb-0\">\n                                            <input\n                                                class=\"custom-control-input customer-profile-radio-input\"\n                                                :disabled=\"!checkedJobs.find(job => job.name === item.name)\"\n                                                :name=\"'suitability'+index\"\n                                                type=\"radio\"\n                                                value=\"isTrainingRequired\"\n                                                v-model=\"item.suitability\"\n                                            >\n                                            <span class=\"custom-control-label pl-1\">\n                                                Training Required\n                                            </span>\n                                        </label>\n                                    </div>\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n                <!-- FORM NAVIGATOR -->\n                <div\n                    class=\"jobs-table-submit\"\n                    :class=\"{ 'has-error': isCheckedLimitReached }\"\n                >\n                    <div class=\"container\">\n                        <div class=\"row align-items-center\">\n                            <div class=\"col-md-6 text-center text-md-left\">\n\n                                <!-- CHECKED LIMIT WARNING -->\n                                <span\n                                    v-if=\"isCheckedLimitReached\"\n                                    class=\"d-inline-block warning-msg mb-2 mb-md-0 shake animated\"\n                                >\n                                    <span>\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i> The maximum selection is {{ checkedLimit }}\n                                    </span>\n                                </span>\n\n                            </div>\n                            <div class=\"col-md-6 text-center text-md-right\">\n\n                                <!-- BACK -->\n                                <button\n                                    class=\"font-weight-bold btn btn-primary px-4 mr-4\"\n                                    @click=\"handlePrev()\"\n                                >\n                                    <i class=\"mr-2 fa fa-angle-left\"></i>Back\n                                </button>\n\n                                <!-- NEXT -->\n                                <button\n                                    class=\"font-weight-bold btn btn-primary px-4\"\n                                    :disabled=\"!canProceed\"\n                                    @click=\"handleNext()\"\n                                >\n                                    Next<i class=\"ml-2 fa fa-angle-right\"></i>\n                                </button>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n        ", props: { data: { type: Array, required: !0 } }, data: function data() {
            return { checkedJobs: [], checkedLimit: 5 };
        },
        computed: {
            canProceed: function canProceed() {
                return this.isCheckedSuitable && !this.isCheckedLimitReached;
            },
            dataFormatted: function dataFormatted() {
                return this.data.map(function (e) {
                    return { name: e, suitability: !1 };
                });
            },
            isCheckedLimitReached: function isCheckedLimitReached() {
                return this.checkedJobs.length > this.checkedLimit;
            },
            isCheckedSuitable: function isCheckedSuitable() {
                return !this.checkedJobs.length || this.checkedJobs.length === this.checkedJobs.filter(function (e) {
                    return e.suitability;
                }).length;
            },
            outputParams: function outputParams() {
                return this.checkedJobs.reduce(function (e, t, i) {
                    var n = encodeURIComponent(t.name.trim()),
                        o = t && "isSuitable" === t.suitability,
                        t = t && "isTrainingRequired" === t.suitability;return (o || t) && (e += "&jobTitle" + (i + 1) + "=" + n), o && (e += "&isSuitable" + (i + 1) + "=true"), t && (e += "&isTrainingRequired" + (i + 1) + "=true"), e;
                }, "");
            }
        }, watch: {
            outputParams: function outputParams() {
                this.$emit("output", this.outputParams);
            }
        }, methods: {
            removeItem: function removeItem(e) {
                this.checkedJobs.splice(e, 1);
            },
            handleNext: function handleNext() {
                e.$emit("nextStep");
            },
            handlePrev: function handlePrev() {
                e.$emit("prevStep");
            }
        } }), Vue.component("education-module", { template: "\n            <div>\n                <div\n                    v-for=\"(item, index) in courseItems\"\n                    :key=\"item.id\"\n                    class=\"row\"\n                >\n                    <div class=\"col-sm-12 col-md-3 col-xl-2\">\n\n                        <!-- QUALIFICATION TYPE SELECT -->\n                        <label for=\"qualification-type\">\n                            Qualification Type\n                        </label>\n\n                        <select-filter\n                            id=\"qualification-type\"\n                            class=\"mb-0\"\n                            :filters=\"data.qualifications\"\n                            v-model=\"courseItems[index].qualificationType\"\n                        />\n                    </div>\n\n                    <div class=\"col-sm-12 col-md-2 col-xl-2\">\n\n                        <!-- COURSE NAME SELECT -->\n                        <label for=\"course-name\">\n                            Course Name\n                        </label>\n\n                        <select-filter\n                            id=\"course-name\"\n                            class=\"mb-0\"\n                            :filters=\"data.courses\"\n                            :disabled=\"!courseItems[index].qualificationType\"\n                            v-model=\"courseItems[index].courseName\"\n                        />\n\n                    </div>\n                    <div class=\"col-sm-12 col-md-2 col-xl-2\">\n\n                        <!-- INSTITUTION -->\n                        <label for=\"institution\">Institution</label>\n\n                        <keyword-search\n                            id=\"institution\"\n                            v-model=\"courseItems[index].institution\"\n                            :disabled=\"!courseItems[index].qualificationType\"\n                        />\n\n                    </div>\n                    <div class=\"col-sm-12 col-md-2 col-xl-2\">\n\n                        <!-- COMPLETED -->\n                        <label for=\"completed-status\">Completed?</label>\n\n                        <select-filter\n                            id=\"completed-status\"\n                            :filters=\"optionsCompleted\"\n                            :disabled=\"!courseItems[index].qualificationType\"\n                            v-model=\"courseItems[index].completed\"\n                        />\n\n                    </div>\n                    <div class=\"col-sm-12 col-md-3 col-xl-4\">\n\n                    <label class=\"d-block invisible hidden-sm-down\">Add / Remove</label>\n\n                        <!-- REMOVE -->\n                        <button\n                            v-if=\"courseItems.length > 1\"\n                            class=\"btn btn-danger px-0 mb-4 mr-2 text-center\"\n                            @click=\"removeCourseItem(index)\"\n                        >\n                            <i class=\"fa fa-trash m-0 px-3\"></i>\n                        </button>\n\n                        <!-- ADD -->\n                        <button\n                            v-if=\"index === courseItems.length - 1\"\n                            class=\"btn btn-primary font-weight-bold text-center mb-4\"\n                            :disabled=\"!courseItems[index].qualificationType\"\n                            @click=\"addCourseItem()\"\n                        >\n                            <i class=\"fa fa-plus m-0 mr-2\"></i> Add More\n                        </button>\n\n                    </div>\n                </div>\n\n                <!-- FORM NAVIGATOR -->\n                <div\n                    class=\"jobs-table-submit\"\n                    :class=\"{ 'has-error': false }\"\n                >\n                    <div class=\"container\">\n                        <div class=\"row align-items-center\">\n                            <div class=\"col-md-6 text-center text-md-left\">\n\n                                <!-- CHECKED LIMIT WARNING -->\n                                <span\n                                    v-if=\"false\"\n                                    class=\"d-inline-block warning-msg mb-2 mb-md-0 shake animated\"\n                                >\n                                    <span>\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i> This is an error.\n                                    </span>\n                                </span>\n\n                            </div>\n                            <div class=\"col-md-6 text-center text-md-right\">\n\n                                <!-- BACK -->\n                                <button\n                                    class=\"font-weight-bold btn btn-primary px-4 mr-4\"\n                                    @click=\"handlePrev()\"\n                                >\n                                    <i class=\"mr-2 fa fa-angle-left\"></i>Back\n                                </button>\n\n                                <!-- NEXT -->\n                                <button\n                                    class=\"font-weight-bold btn btn-primary px-4\"\n                                    :disabled=\"!canProceed\"\n                                    @click=\"handleNext()\"\n                                >\n                                    Next<i class=\"ml-2 fa fa-angle-right\"></i>\n                                </button>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n        ", props: { data: { type: Object, required: !0 } }, data: function data() {
            return { courseItems: [], optionsCompleted: [{ name: "Yes", value: "Yes" }, { name: "No", value: "No" }, { name: "Deferred", value: "Deferred" }, { name: "In Progress", value: "In Progress" }] };
        },
        computed: {
            canProceed: function canProceed() {
                return 1 === this.courseItems.length && !this.courseItems[0].qualificationType || this.courseItems.length === this.courseItems.filter(function (e) {
                    return e.qualificationType && e.courseName && e.institution && e.completed;
                }).length;
            },
            outputParams: function outputParams() {
                return this.courseItems.reduce(function (e, t, i) {
                    var n = encodeURIComponent(t.qualificationType.trim()),
                        o = encodeURIComponent(t.courseName.trim()),
                        r = encodeURIComponent(t.institution.trim()),
                        t = encodeURIComponent(t.completed.trim());return n && o && r && t && (e += "&qualificationType" + (i + 1) + "=" + n, e += "&courseName" + (i + 1) + "=" + o, e += "&institution" + (i + 1) + "=" + r, e += "&completed" + (i + 1) + "=" + t), e;
                }, "");
            }
        }, watch: {
            outputParams: function outputParams() {
                this.$emit("output", this.outputParams);
            }
        }, created: function created() {
            this.addCourseItem();
        },
        methods: {
            addCourseItem: function addCourseItem() {
                this.courseItems.push({ id: this.generateId(), qualificationType: "", courseName: "", institution: "", completed: "" });
            },
            generateId: function generateId() {
                return Date.now() + Math.floor(5 * Math.random());
            },
            removeCourseItem: function removeCourseItem(e) {
                this.courseItems.splice(e, 1);
            },
            handleNext: function handleNext() {
                e.$emit("nextStep");
            },
            handlePrev: function handlePrev() {
                e.$emit("prevStep");
            }
        } }), Vue.component("licences-table", { template: "\n            <div>\n                <!-- YOUR SELECTIONS -->\n                <div v-if=\"checkedItems.length\" class=\"mb-4\">\n                    <label class=\"d-block\">Your selections:</label>\n                    <button\n                        v-for=\"(item, index) in checkedItems\"\n                        :key=\"item.licence\"\n                        class=\"badge badge-pill badge-primary mr-1\"\n                        title=\"Remove\"\n                        @click=\"removeItem(index)\"\n                    >\n                       <i class=\"fa fa-close mr-1\"></i> {{ item.licence }}\n                    </button>\n                </div>\n\n                <div class=\"table-responsive\">\n                    <table class=\"table table-bordered\">\n                        <thead>\n                            <tr>\n                                <th>\n                                    <h4 class=\"mb-0\">\n                                        Licence\n                                    </h4>\n                                </th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr\n                                v-for=\"(item, index) in data\"\n                                :key=\"item.licence\"\n                            >\n                                <td>\n                                    <div>\n                                        <label class=\"d-inline-block custom-control custom-checkbox mb-0\">\n                                            <input\n                                                class=\"custom-control-input\"\n                                                name=\"licence\"\n                                                type=\"checkbox\"\n                                                :value=\"{ licence: item }\"\n                                                v-model=\"checkedItems\"\n                                            >\n                                            <span class=\"custom-control-label pl-1\">\n                                                {{ item }}\n                                            </span>\n                                        </label>\n                                    </div>\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n                <!-- FORM NAVIGATOR -->\n                <div\n                    class=\"jobs-table-submit\"\n                    :class=\"{ 'has-error': false }\"\n                >\n                    <div class=\"container\">\n                        <div class=\"row align-items-center\">\n                            <div class=\"col-md-6 text-center text-md-left\">\n                            </div>\n                            <div class=\"col-md-6 text-center text-md-right\">\n\n                                <!-- BACK -->\n                                <button\n                                    class=\"font-weight-bold btn btn-primary px-4 mr-4\"\n                                    @click=\"handlePrev()\"\n                                >\n                                    <i class=\"mr-2 fa fa-angle-left\"></i>Back\n                                </button>\n\n                                <!-- NEXT -->\n                                <button\n                                    class=\"font-weight-bold btn btn-primary px-4\"\n                                    @click=\"handleNext()\"\n                                >\n                                    Next<i class=\"ml-2 fa fa-angle-right\"></i>\n                                </button>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n        ", props: { data: { type: Array, required: !0 } }, data: function data() {
            return { checkedItems: [] };
        },
        computed: {
            outputParams: function outputParams() {
                return this.checkedItems.reduce(function (e, t, i) {
                    return e += "&licence" + (i + 1) + "=" + encodeURIComponent(t.licence.trim());
                }, "");
            },
            checkedItemsList: function checkedItemsList() {
                return this.checkedItems.map(function (e) {
                    return e.licence;
                }).join(", ");
            }
        }, watch: {
            outputParams: function outputParams() {
                this.$emit("output", this.outputParams);
            }
        }, methods: {
            removeItem: function removeItem(e) {
                this.checkedItems.splice(e, 1);
            },
            handleNext: function handleNext() {
                e.$emit("nextStep");
            },
            handlePrev: function handlePrev() {
                e.$emit("prevStep");
            }
        } }), Vue.component("skills-table", { template: "\n            <div>\n                <!-- YOUR SELECTIONS -->\n                <div v-if=\"checkedItems.length\" class=\"mb-4\">\n                    <label class=\"d-block\">Your selections:</label>\n                    <button\n                        v-for=\"(item, index) in checkedItems\"\n                        :key=\"item.skill\"\n                        class=\"badge badge-pill badge-primary mr-1\"\n                        title=\"Remove\"\n                        @click=\"removeItem(index)\"\n                    >\n                       <i class=\"fa fa-close mr-1\"></i> {{ item.skill }}\n                    </button>\n                </div>\n\n                <div class=\"table-responsive\">\n                    <table class=\"table table-bordered\">\n                        <thead>\n                            <tr>\n                                <th>\n                                    <h4 class=\"mb-0\">\n                                        Skill\n                                    </h4>\n                                </th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr\n                                v-for=\"(item, index) in data\"\n                                :key=\"item.skill\"\n                            >\n                                <td>\n                                    <div>\n                                        <label class=\"d-inline-block custom-control custom-checkbox mb-0\">\n                                            <input\n                                                class=\"custom-control-input\"\n                                                name=\"skill\"\n                                                type=\"checkbox\"\n                                                :value=\"{ skill: item }\"\n                                                v-model=\"checkedItems\"\n                                            >\n                                            <span class=\"custom-control-label pl-1\">\n                                                {{ item }}\n                                            </span>\n                                        </label>\n                                    </div>\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n                <!-- FORM NAVIGATOR -->\n                <div\n                    class=\"jobs-table-submit\"\n                    :class=\"{ 'has-error': false }\"\n                >\n                    <div class=\"container\">\n                        <div class=\"row align-items-center\">\n                            <div class=\"col-md-6 text-center text-md-left\">\n                            </div>\n                            <div class=\"col-md-6 text-center text-md-right\">\n\n                                <!-- BACK -->\n                                <button\n                                    class=\"font-weight-bold btn btn-primary px-4 mr-4\"\n                                    @click=\"handlePrev()\"\n                                >\n                                    <i class=\"mr-2 fa fa-angle-left\"></i>Back\n                                </button>\n\n                                <!-- NEXT -->\n                                <button\n                                    class=\"font-weight-bold btn btn-primary px-4\"\n                                    @click=\"handleNext()\"\n                                >\n                                    Next<i class=\"ml-2 fa fa-angle-right\"></i>\n                                </button>\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n        ", props: { data: { type: Array, required: !0 } }, data: function data() {
            return { checkedItems: [] };
        },
        computed: {
            outputParams: function outputParams() {
                return this.checkedItems.reduce(function (e, t, i) {
                    return e += "&skill" + (i + 1) + "=" + encodeURIComponent(t.skill.trim());
                }, "");
            },
            checkedItemsList: function checkedItemsList() {
                return this.checkedItems.map(function (e) {
                    return e.skill;
                }).join(", ");
            }
        }, watch: {
            outputParams: function outputParams() {
                this.$emit("output", this.outputParams);
            }
        }, methods: {
            removeItem: function removeItem(e) {
                this.checkedItems.splice(e, 1);
            },
            handleNext: function handleNext() {
                e.$emit("nextStep");
            },
            handlePrev: function handlePrev() {
                e.$emit("prevStep");
            }
        } }), Vue.component("select-filter", { template: "\n            <select\n                class=\"custom-select mb-3\"\n                :name=\"id\"\n                :filter-order=\"filterOrder\"\n                v-model=\"filterOrder\"\n                @change=\"$emit('input', filterOrder)\"\n            >\n                <option\n                    v-for=\"item in filters\"\n                    :value=\"item.value\"\n                    v-text=\"item.name\"\n                >\n                </option>\n            </select>\n        ", props: { filters: { type: Array, required: !0 }, id: { type: String, required: !0 } }, data: function data() {
            return { filterOrder: "All" };
        }
    }), Vue.component("keyword-search", { template: "\n            <input\n                type=\"text\"\n                class=\"form-control mb-3\"\n                :name=\"id\"\n                :value=\"value\"\n                @input=\"$emit('input', $event.target.value)\"\n            >\n        ", props: { id: { type: String, required: !0 }, value: { type: String, required: !0 } } }), new Vue({ el: "#vue-customer-profile-app", data: function data() {
            return { csvData: {}, currentStep: 1, maxSteps: 5, filterKeywordsIndustries: "", filterKeywordsJobs: "", filterKeywordsLicences: "", filterKeywordsSkills: "", filterLicenceType: "All", filterSkillType: "All", redirectPath: "", isDevToolActive: !0, step1Params: "", step2Params: "", step3Params: "", step4Params: "", step5Params: "" };
        },
        computed: {
            finalQueryString: function finalQueryString() {
                return this.redirectPath + ("?data=" + !!this.hasData) + this.step1Params + this.step2Params + this.step3Params + this.step4Params + this.step5Params;
            },
            hasData: function hasData() {
                return this.step1Params || this.step2Params || this.step3Params || this.step4Params || this.step5Params;
            },
            industriesFiltered: function industriesFiltered() {
                var _this3 = this;

                var e = this.csvData && this.csvData.industries && this.csvData.industries.map(function (e) {
                    return e[0];
                }) || [];return this.filterKeywordsIndustries && (e = e.filter(function (t, e) {
                    return _this3.filterKeywordsIndustries.toLowerCase().split(" ").every(function (e) {
                        return t && -1 !== t.toLowerCase().indexOf(e);
                    });
                })), e;
            },
            jobsFiltered: function jobsFiltered() {
                var _this4 = this;

                var e = this.csvData && this.csvData.jobs && this.csvData.jobs.map(function (e) {
                    return e[0];
                }) || [];return this.filterKeywordsJobs && (e = e.filter(function (t, e) {
                    return _this4.filterKeywordsJobs.toLowerCase().split(" ").every(function (e) {
                        return t && -1 !== t.toLowerCase().indexOf(e);
                    });
                })), e || [];
            },
            qualificationsFiltered: function qualificationsFiltered() {
                return this.csvData && this.csvData.qualifications && this.csvData.qualifications.map(function (e) {
                    return { name: e[0], value: e[0] };
                }).slice(1) || [];
            },
            coursesFiltered: function coursesFiltered() {
                return this.csvData && this.csvData.courses && this.csvData.courses.map(function (e) {
                    return { name: e[0], value: e[0] };
                }).slice(1) || [];
            },
            licenceTypes: function licenceTypes() {
                return this.csvData && this.csvData.licences && this.csvData.licences.reduce(function (e, t, i) {
                    return 0 === i || e.find(function (e) {
                        return e.name === t[0];
                    }) || e.push({ name: t[0], value: t[0] }), e;
                }, [{ name: "All Types", value: "All" }]) || [];
            },
            licencesFiltered: function licencesFiltered() {
                var _this5 = this;

                var e = this.csvData && this.csvData.licences && this.csvData.licences.filter(function (e) {
                    return "Group" !== e[0];
                });return "All" !== this.filterLicenceType && (e = e.filter(function (e, t) {
                    return e[0] === _this5.filterLicenceType;
                })), this.filterKeywordsLicences && (e = e.filter(function (t, e) {
                    return t && _this5.filterKeywordsLicences && _this5.filterKeywordsLicences.toLowerCase().split(" ").every(function (e) {
                        return -1 !== t.join(" ").toLowerCase().indexOf(e);
                    });
                })), e && e.map(function (e) {
                    return e[1];
                }) || [];
            },
            skillTypes: function skillTypes() {
                return this.csvData && this.csvData.skills && this.csvData.skills.reduce(function (e, t, i) {
                    return 0 === i || e.find(function (e) {
                        return e.name === t[0];
                    }) || e.push({ name: t[0], value: t[0] }), e;
                }, [{ name: "All Types", value: "All" }]) || [];
            },
            skillsFiltered: function skillsFiltered() {
                var _this6 = this;

                var e = this.csvData && this.csvData.skills && this.csvData.skills.filter(function (e) {
                    return "Group" !== e[0];
                });return "All" !== this.filterSkillType && (e = e.filter(function (e, t) {
                    return e[0] === _this6.filterSkillType;
                })), this.filterKeywordsSkills && (e = e.filter(function (t, e) {
                    return t && _this6.filterKeywordsSkills && _this6.filterKeywordsSkills.toLowerCase().split(" ").every(function (e) {
                        return -1 !== t.join(" ").toLowerCase().indexOf(e);
                    });
                })), e && e.map(function (e) {
                    return e[1];
                }) || [];
            }
        }, created: function created() {
            var _this7 = this;

            e.$on("nextStep", function () {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" }), _this7.currentStep < _this7.maxSteps ? _this7.currentStep += 1 : window.location = _this7.finalQueryString;
            }), e.$on("prevStep", function () {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" }), 1 < _this7.currentStep && --_this7.currentStep;
            });
        },
        mounted: function mounted() {
            var e = { courses: this.$el.getAttribute("data-csv-courses"), industries: this.$el.getAttribute("data-csv-industries"), jobs: this.$el.getAttribute("data-csv-jobs"), licences: this.$el.getAttribute("data-csv-licences"), qualifications: this.$el.getAttribute("data-csv-qualifications"), skills: this.$el.getAttribute("data-csv-skills") };this.parseCSV(e), this.redirectPath = this.$el.getAttribute("data-redirect-path");
        },
        methods: {
            parseCSV: function parseCSV(e) {
                var _this8 = this;

                var _loop = function _loop(o, t) {
                    Papa.parse(t, { download: !0, complete: function complete(e) {
                            Vue.set(_this8.csvData, o, e.data);
                        }, error: function error(e, t, i, n) {
                            alert("Oops! There was a CSV parsing error with " + o + ".csv. Please ensure the format is correct and try again. Additional info: " + e + ".");
                        } });
                };

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Object.entries(e)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _ref = _step.value;

                        var _ref2 = _slicedToArray(_ref, 2);

                        var o = _ref2[0];
                        var t = _ref2[1];

                        _loop(o, t);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        } });
}!function (e, t) {
    "use strict";
    "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");return t(e);
    } : t(e);
}("undefined" != typeof window ? window : this, function (x, e) {
    "use strict";
    function m(e) {
        return "function" == typeof e && "number" != typeof e.nodeType;
    }function g(e) {
        return null != e && e === e.window;
    }var t = [],
        i = Object.getPrototypeOf,
        a = t.slice,
        v = t.flat ? function (e) {
        return t.flat.call(e);
    } : function (e) {
        return t.concat.apply([], e);
    },
        l = t.push,
        o = t.indexOf,
        n = {},
        r = n.toString,
        y = n.hasOwnProperty,
        s = y.toString,
        c = s.call(Object),
        b = {},
        E = x.document,
        u = { type: !0, src: !0, nonce: !0, noModule: !0 };function _(e, t, i) {
        var n,
            o,
            r = (i = i || E).createElement("script");if (r.text = e, t) for (n in u) {
            (o = t[n] || t.getAttribute && t.getAttribute(n)) && r.setAttribute(n, o);
        }i.head.appendChild(r).parentNode.removeChild(r);
    }function p(e) {
        return null == e ? e + "" : "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || "function" == typeof e ? n[r.call(e)] || "object" : typeof e === "undefined" ? "undefined" : _typeof(e);
    }var d = "3.5.1",
        C = function C(e, t) {
        return new C.fn.init(e, t);
    };function h(e) {
        var t = !!e && "length" in e && e.length,
            i = p(e);return !m(e) && !g(e) && ("array" === i || 0 === t || "number" == typeof t && 0 < t && t - 1 in e);
    }C.fn = C.prototype = { jquery: d, constructor: C, length: 0, toArray: function toArray() {
            return a.call(this);
        }, get: function get(e) {
            return null == e ? a.call(this) : e < 0 ? this[e + this.length] : this[e];
        }, pushStack: function pushStack(e) {
            e = C.merge(this.constructor(), e);return e.prevObject = this, e;
        }, each: function each(e) {
            return C.each(this, e);
        }, map: function map(i) {
            return this.pushStack(C.map(this, function (e, t) {
                return i.call(e, t, e);
            }));
        }, slice: function slice() {
            return this.pushStack(a.apply(this, arguments));
        }, first: function first() {
            return this.eq(0);
        }, last: function last() {
            return this.eq(-1);
        }, even: function even() {
            return this.pushStack(C.grep(this, function (e, t) {
                return (t + 1) % 2;
            }));
        }, odd: function odd() {
            return this.pushStack(C.grep(this, function (e, t) {
                return t % 2;
            }));
        }, eq: function eq(e) {
            var t = this.length,
                e = +e + (e < 0 ? t : 0);return this.pushStack(0 <= e && e < t ? [this[e]] : []);
        }, end: function end() {
            return this.prevObject || this.constructor();
        }, push: l, sort: t.sort, splice: t.splice }, C.extend = C.fn.extend = function () {
        var e,
            t,
            i,
            n,
            o,
            r = arguments[0] || {},
            s = 1,
            a = arguments.length,
            l = !1;for ("boolean" == typeof r && (l = r, r = arguments[s] || {}, s++), "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) || m(r) || (r = {}), s === a && (r = this, s--); s < a; s++) {
            if (null != (e = arguments[s])) for (t in e) {
                i = e[t], "__proto__" !== t && r !== i && (l && i && (C.isPlainObject(i) || (n = Array.isArray(i))) ? (o = r[t], o = n && !Array.isArray(o) ? [] : n || C.isPlainObject(o) ? o : {}, n = !1, r[t] = C.extend(l, o, i)) : void 0 !== i && (r[t] = i));
            }
        }return r;
    }, C.extend({ expando: "jQuery" + (d + Math.random()).replace(/\D/g, ""), isReady: !0, error: function error(e) {
            throw new Error(e);
        }, noop: function noop() {}, isPlainObject: function isPlainObject(e) {
            return !(!e || "[object Object]" !== r.call(e)) && (!(e = i(e)) || "function" == typeof (e = y.call(e, "constructor") && e.constructor) && s.call(e) === c);
        }, isEmptyObject: function isEmptyObject(e) {
            for (var t in e) {
                return !1;
            }return !0;
        }, globalEval: function globalEval(e, t, i) {
            _(e, { nonce: t && t.nonce }, i);
        }, each: function each(e, t) {
            var i,
                n = 0;if (h(e)) for (i = e.length; n < i && !1 !== t.call(e[n], n, e[n]); n++) {} else for (n in e) {
                if (!1 === t.call(e[n], n, e[n])) break;
            }return e;
        }, makeArray: function makeArray(e, t) {
            t = t || [];return null != e && (h(Object(e)) ? C.merge(t, "string" == typeof e ? [e] : e) : l.call(t, e)), t;
        }, inArray: function inArray(e, t, i) {
            return null == t ? -1 : o.call(t, e, i);
        }, merge: function merge(e, t) {
            for (var i = +t.length, n = 0, o = e.length; n < i; n++) {
                e[o++] = t[n];
            }return e.length = o, e;
        }, grep: function grep(e, t, i) {
            for (var n = [], o = 0, r = e.length, s = !i; o < r; o++) {
                !t(e[o], o) != s && n.push(e[o]);
            }return n;
        }, map: function map(e, t, i) {
            var n,
                o,
                r = 0,
                s = [];if (h(e)) for (n = e.length; r < n; r++) {
                null != (o = t(e[r], r, i)) && s.push(o);
            } else for (r in e) {
                null != (o = t(e[r], r, i)) && s.push(o);
            }return v(s);
        }, guid: 1, support: b }), "function" == typeof Symbol && (C.fn[Symbol.iterator] = t[Symbol.iterator]), C.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
        n["[object " + t + "]"] = t.toLowerCase();
    });var f = function (i) {
        function d(e, t) {
            return e = "0x" + e.slice(1) - 65536, t || (e < 0 ? String.fromCharCode(65536 + e) : String.fromCharCode(e >> 10 | 55296, 1023 & e | 56320));
        }function h(e, t) {
            return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
        }function n() {
            x();
        }var e,
            f,
            _,
            r,
            o,
            p,
            m,
            g,
            w,
            l,
            c,
            x,
            E,
            s,
            C,
            v,
            a,
            u,
            y,
            k = "sizzle" + +new Date(),
            b = i.document,
            T = 0,
            S = 0,
            D = le(),
            A = le(),
            L = le(),
            N = le(),
            I = function I(e, t) {
            return e === t && (c = !0), 0;
        },
            P = {}.hasOwnProperty,
            t = [],
            j = t.pop,
            O = t.push,
            R = t.push,
            q = t.slice,
            F = function F(e, t) {
            for (var i = 0, n = e.length; i < n; i++) {
                if (e[i] === t) return i;
            }return -1;
        },
            M = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            H = "[\\x20\\t\\r\\n\\f]",
            z = "(?:\\\\[\\da-fA-F]{1,6}" + H + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
            B = "\\[" + H + "*(" + z + ")(?:" + H + "*([*^$|!~]?=)" + H + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + z + "))|)" + H + "*\\]",
            W = ":(" + z + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + B + ")*)|.*)\\)|)",
            U = new RegExp(H + "+", "g"),
            $ = new RegExp("^" + H + "+|((?:^|[^\\\\])(?:\\\\.)*)" + H + "+$", "g"),
            V = new RegExp("^" + H + "*," + H + "*"),
            Q = new RegExp("^" + H + "*([>+~]|" + H + ")" + H + "*"),
            X = new RegExp(H + "|>"),
            Y = new RegExp(W),
            K = new RegExp("^" + z + "$"),
            G = { ID: new RegExp("^#(" + z + ")"), CLASS: new RegExp("^\\.(" + z + ")"), TAG: new RegExp("^(" + z + "|[*])"), ATTR: new RegExp("^" + B), PSEUDO: new RegExp("^" + W), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + H + "*(even|odd|(([+-]|)(\\d*)n|)" + H + "*(?:([+-]|)" + H + "*(\\d+)|))" + H + "*\\)|)", "i"), bool: new RegExp("^(?:" + M + ")$", "i"), needsContext: new RegExp("^" + H + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + H + "*((?:-\\d)?\\d*)" + H + "*\\)|)(?=[^-]|$)", "i") },
            J = /HTML$/i,
            Z = /^(?:input|select|textarea|button)$/i,
            ee = /^h\d$/i,
            te = /^[^{]+\{\s*\[native \w/,
            ie = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ne = /[+~]/,
            oe = new RegExp("\\\\[\\da-fA-F]{1,6}" + H + "?|\\\\([^\\r\\n\\f])", "g"),
            re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            se = ye(function (e) {
            return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
        }, { dir: "parentNode", next: "legend" });try {
            R.apply(t = q.call(b.childNodes), b.childNodes), t[b.childNodes.length].nodeType;
        } catch (e) {
            R = { apply: t.length ? function (e, t) {
                    O.apply(e, q.call(t));
                } : function (e, t) {
                    for (var i = e.length, n = 0; e[i++] = t[n++];) {}e.length = i - 1;
                } };
        }function ae(t, e, i, n) {
            var o,
                r,
                s,
                a,
                l,
                c,
                u = e && e.ownerDocument,
                d = e ? e.nodeType : 9;if (i = i || [], "string" != typeof t || !t || 1 !== d && 9 !== d && 11 !== d) return i;if (!n && (x(e), e = e || E, C)) {
                if (11 !== d && (a = ie.exec(t))) if (c = a[1]) {
                    if (9 === d) {
                        if (!(r = e.getElementById(c))) return i;if (r.id === c) return i.push(r), i;
                    } else if (u && (r = u.getElementById(c)) && y(e, r) && r.id === c) return i.push(r), i;
                } else {
                    if (a[2]) return R.apply(i, e.getElementsByTagName(t)), i;if ((c = a[3]) && f.getElementsByClassName && e.getElementsByClassName) return R.apply(i, e.getElementsByClassName(c)), i;
                }if (f.qsa && !N[t + " "] && (!v || !v.test(t)) && (1 !== d || "object" !== e.nodeName.toLowerCase())) {
                    if (c = t, u = e, 1 === d && (X.test(t) || Q.test(t))) {
                        for ((u = ne.test(t) && me(e.parentNode) || e) === e && f.scope || ((s = e.getAttribute("id")) ? s = s.replace(re, h) : e.setAttribute("id", s = k)), o = (l = p(t)).length; o--;) {
                            l[o] = (s ? "#" + s : ":scope") + " " + ve(l[o]);
                        }c = l.join(",");
                    }try {
                        return R.apply(i, u.querySelectorAll(c)), i;
                    } catch (e) {
                        N(t, !0);
                    } finally {
                        s === k && e.removeAttribute("id");
                    }
                }
            }return g(t.replace($, "$1"), e, i, n);
        }function le() {
            var i = [];function n(e, t) {
                return i.push(e + " ") > _.cacheLength && delete n[i.shift()], n[e + " "] = t;
            }return n;
        }function ce(e) {
            return e[k] = !0, e;
        }function ue(e) {
            var t = E.createElement("fieldset");try {
                return !!e(t);
            } catch (e) {
                return !1;
            } finally {
                t.parentNode && t.parentNode.removeChild(t);
            }
        }function de(e, t) {
            for (var i = e.split("|"), n = i.length; n--;) {
                _.attrHandle[i[n]] = t;
            }
        }function he(e, t) {
            var i = t && e,
                n = i && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;if (n) return n;if (i) for (; i = i.nextSibling;) {
                if (i === t) return -1;
            }return e ? 1 : -1;
        }function fe(t) {
            return function (e) {
                return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && se(e) === t : e.disabled === t : "label" in e && e.disabled === t;
            };
        }function pe(s) {
            return ce(function (r) {
                return r = +r, ce(function (e, t) {
                    for (var i, n = s([], e.length, r), o = n.length; o--;) {
                        e[i = n[o]] && (e[i] = !(t[i] = e[i]));
                    }
                });
            });
        }function me(e) {
            return e && void 0 !== e.getElementsByTagName && e;
        }for (e in f = ae.support = {}, o = ae.isXML = function (e) {
            var t = e.namespaceURI,
                e = (e.ownerDocument || e).documentElement;return !J.test(t || e && e.nodeName || "HTML");
        }, x = ae.setDocument = function (e) {
            var t,
                e = e ? e.ownerDocument || e : b;return e != E && 9 === e.nodeType && e.documentElement && (s = (E = e).documentElement, C = !o(E), b != E && (t = E.defaultView) && t.top !== t && (t.addEventListener ? t.addEventListener("unload", n, !1) : t.attachEvent && t.attachEvent("onunload", n)), f.scope = ue(function (e) {
                return s.appendChild(e).appendChild(E.createElement("div")), void 0 !== e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length;
            }), f.attributes = ue(function (e) {
                return e.className = "i", !e.getAttribute("className");
            }), f.getElementsByTagName = ue(function (e) {
                return e.appendChild(E.createComment("")), !e.getElementsByTagName("*").length;
            }), f.getElementsByClassName = te.test(E.getElementsByClassName), f.getById = ue(function (e) {
                return s.appendChild(e).id = k, !E.getElementsByName || !E.getElementsByName(k).length;
            }), f.getById ? (_.filter.ID = function (e) {
                var t = e.replace(oe, d);return function (e) {
                    return e.getAttribute("id") === t;
                };
            }, _.find.ID = function (e, t) {
                if (void 0 !== t.getElementById && C) {
                    e = t.getElementById(e);return e ? [e] : [];
                }
            }) : (_.filter.ID = function (e) {
                var t = e.replace(oe, d);return function (e) {
                    e = void 0 !== e.getAttributeNode && e.getAttributeNode("id");return e && e.value === t;
                };
            }, _.find.ID = function (e, t) {
                if (void 0 !== t.getElementById && C) {
                    var i,
                        n,
                        o,
                        r = t.getElementById(e);if (r) {
                        if ((i = r.getAttributeNode("id")) && i.value === e) return [r];for (o = t.getElementsByName(e), n = 0; r = o[n++];) {
                            if ((i = r.getAttributeNode("id")) && i.value === e) return [r];
                        }
                    }return [];
                }
            }), _.find.TAG = f.getElementsByTagName ? function (e, t) {
                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : f.qsa ? t.querySelectorAll(e) : void 0;
            } : function (e, t) {
                var i,
                    n = [],
                    o = 0,
                    r = t.getElementsByTagName(e);if ("*" !== e) return r;for (; i = r[o++];) {
                    1 === i.nodeType && n.push(i);
                }return n;
            }, _.find.CLASS = f.getElementsByClassName && function (e, t) {
                if (void 0 !== t.getElementsByClassName && C) return t.getElementsByClassName(e);
            }, a = [], v = [], (f.qsa = te.test(E.querySelectorAll)) && (ue(function (e) {
                var t;s.appendChild(e).innerHTML = "<a id='" + k + "'></a><select id='" + k + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + H + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[" + H + "*(?:value|" + M + ")"), e.querySelectorAll("[id~=" + k + "-]").length || v.push("~="), (t = E.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || v.push("\\[" + H + "*name" + H + "*=" + H + "*(?:''|\"\")"), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + k + "+*").length || v.push(".#.+[+~]"), e.querySelectorAll("\\\f"), v.push("[\\r\\n\\f]");
            }), ue(function (e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t = E.createElement("input");t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + H + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"), s.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:");
            })), (f.matchesSelector = te.test(u = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector)) && ue(function (e) {
                f.disconnectedMatch = u.call(e, "*"), u.call(e, "[s!='']:x"), a.push("!=", W);
            }), v = v.length && new RegExp(v.join("|")), a = a.length && new RegExp(a.join("|")), t = te.test(s.compareDocumentPosition), y = t || te.test(s.contains) ? function (e, t) {
                var i = 9 === e.nodeType ? e.documentElement : e,
                    t = t && t.parentNode;return e === t || !(!t || 1 !== t.nodeType || !(i.contains ? i.contains(t) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(t)));
            } : function (e, t) {
                if (t) for (; t = t.parentNode;) {
                    if (t === e) return !0;
                }return !1;
            }, I = t ? function (e, t) {
                if (e === t) return c = !0, 0;var i = !e.compareDocumentPosition - !t.compareDocumentPosition;return i || (1 & (i = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !f.sortDetached && t.compareDocumentPosition(e) === i ? e == E || e.ownerDocument == b && y(b, e) ? -1 : t == E || t.ownerDocument == b && y(b, t) ? 1 : l ? F(l, e) - F(l, t) : 0 : 4 & i ? -1 : 1);
            } : function (e, t) {
                if (e === t) return c = !0, 0;var i,
                    n = 0,
                    o = e.parentNode,
                    r = t.parentNode,
                    s = [e],
                    a = [t];if (!o || !r) return e == E ? -1 : t == E ? 1 : o ? -1 : r ? 1 : l ? F(l, e) - F(l, t) : 0;if (o === r) return he(e, t);for (i = e; i = i.parentNode;) {
                    s.unshift(i);
                }for (i = t; i = i.parentNode;) {
                    a.unshift(i);
                }for (; s[n] === a[n];) {
                    n++;
                }return n ? he(s[n], a[n]) : s[n] == b ? -1 : a[n] == b ? 1 : 0;
            }), E;
        }, ae.matches = function (e, t) {
            return ae(e, null, null, t);
        }, ae.matchesSelector = function (e, t) {
            if (x(e), f.matchesSelector && C && !N[t + " "] && (!a || !a.test(t)) && (!v || !v.test(t))) try {
                var i = u.call(e, t);if (i || f.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i;
            } catch (e) {
                N(t, !0);
            }return 0 < ae(t, E, null, [e]).length;
        }, ae.contains = function (e, t) {
            return (e.ownerDocument || e) != E && x(e), y(e, t);
        }, ae.attr = function (e, t) {
            (e.ownerDocument || e) != E && x(e);var i = _.attrHandle[t.toLowerCase()],
                i = i && P.call(_.attrHandle, t.toLowerCase()) ? i(e, t, !C) : void 0;return void 0 !== i ? i : f.attributes || !C ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null;
        }, ae.escape = function (e) {
            return (e + "").replace(re, h);
        }, ae.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e);
        }, ae.uniqueSort = function (e) {
            var t,
                i = [],
                n = 0,
                o = 0;if (c = !f.detectDuplicates, l = !f.sortStable && e.slice(0), e.sort(I), c) {
                for (; t = e[o++];) {
                    t === e[o] && (n = i.push(o));
                }for (; n--;) {
                    e.splice(i[n], 1);
                }
            }return l = null, e;
        }, r = ae.getText = function (e) {
            var t,
                i = "",
                n = 0,
                o = e.nodeType;if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent) return e.textContent;for (e = e.firstChild; e; e = e.nextSibling) {
                        i += r(e);
                    }
                } else if (3 === o || 4 === o) return e.nodeValue;
            } else for (; t = e[n++];) {
                i += r(t);
            }return i;
        }, (_ = ae.selectors = { cacheLength: 50, createPseudo: ce, match: G, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(e) {
                    return e[1] = e[1].replace(oe, d), e[3] = (e[3] || e[4] || e[5] || "").replace(oe, d), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                }, CHILD: function CHILD(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ae.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ae.error(e[0]), e;
                }, PSEUDO: function PSEUDO(e) {
                    var t,
                        i = !e[6] && e[2];return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : i && Y.test(i) && (t = p(i, !0)) && (t = i.indexOf(")", i.length - t) - i.length) && (e[0] = e[0].slice(0, t), e[2] = i.slice(0, t)), e.slice(0, 3));
                } }, filter: { TAG: function TAG(e) {
                    var t = e.replace(oe, d).toLowerCase();return "*" === e ? function () {
                        return !0;
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t;
                    };
                }, CLASS: function CLASS(e) {
                    var t = D[e + " "];return t || (t = new RegExp("(^|" + H + ")" + e + "(" + H + "|$)")) && D(e, function (e) {
                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "");
                    });
                }, ATTR: function ATTR(t, i, n) {
                    return function (e) {
                        e = ae.attr(e, t);return null == e ? "!=" === i : !i || (e += "", "=" === i ? e === n : "!=" === i ? e !== n : "^=" === i ? n && 0 === e.indexOf(n) : "*=" === i ? n && -1 < e.indexOf(n) : "$=" === i ? n && e.slice(-n.length) === n : "~=" === i ? -1 < (" " + e.replace(U, " ") + " ").indexOf(n) : "|=" === i && (e === n || e.slice(0, n.length + 1) === n + "-"));
                    };
                }, CHILD: function CHILD(p, e, t, m, g) {
                    var v = "nth" !== p.slice(0, 3),
                        y = "last" !== p.slice(-4),
                        b = "of-type" === e;return 1 === m && 0 === g ? function (e) {
                        return !!e.parentNode;
                    } : function (e, t, i) {
                        var n,
                            o,
                            r,
                            s,
                            a,
                            l,
                            c = v != y ? "nextSibling" : "previousSibling",
                            u = e.parentNode,
                            d = b && e.nodeName.toLowerCase(),
                            h = !i && !b,
                            f = !1;if (u) {
                            if (v) {
                                for (; c;) {
                                    for (s = e; s = s[c];) {
                                        if (b ? s.nodeName.toLowerCase() === d : 1 === s.nodeType) return !1;
                                    }l = c = "only" === p && !l && "nextSibling";
                                }return !0;
                            }if (l = [y ? u.firstChild : u.lastChild], y && h) {
                                for (f = (a = (n = (o = (r = (s = u)[k] || (s[k] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[p] || [])[0] === T && n[1]) && n[2], s = a && u.childNodes[a]; s = ++a && s && s[c] || (f = a = 0) || l.pop();) {
                                    if (1 === s.nodeType && ++f && s === e) {
                                        o[p] = [T, a, f];break;
                                    }
                                }
                            } else if (!1 === (f = h ? a = (n = (o = (r = (s = e)[k] || (s[k] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[p] || [])[0] === T && n[1] : f)) for (; (s = ++a && s && s[c] || (f = a = 0) || l.pop()) && ((b ? s.nodeName.toLowerCase() !== d : 1 !== s.nodeType) || !++f || (h && ((o = (r = s[k] || (s[k] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[p] = [T, f]), s !== e));) {}return (f -= g) === m || f % m == 0 && 0 <= f / m;
                        }
                    };
                }, PSEUDO: function PSEUDO(e, r) {
                    var t,
                        s = _.pseudos[e] || _.setFilters[e.toLowerCase()] || ae.error("unsupported pseudo: " + e);return s[k] ? s(r) : 1 < s.length ? (t = [e, e, "", r], _.setFilters.hasOwnProperty(e.toLowerCase()) ? ce(function (e, t) {
                        for (var i, n = s(e, r), o = n.length; o--;) {
                            e[i = F(e, n[o])] = !(t[i] = n[o]);
                        }
                    }) : function (e) {
                        return s(e, 0, t);
                    }) : s;
                } }, pseudos: { not: ce(function (e) {
                    var n = [],
                        o = [],
                        a = m(e.replace($, "$1"));return a[k] ? ce(function (e, t, i, n) {
                        for (var o, r = a(e, null, n, []), s = e.length; s--;) {
                            (o = r[s]) && (e[s] = !(t[s] = o));
                        }
                    }) : function (e, t, i) {
                        return n[0] = e, a(n, null, i, o), n[0] = null, !o.pop();
                    };
                }), has: ce(function (t) {
                    return function (e) {
                        return 0 < ae(t, e).length;
                    };
                }), contains: ce(function (t) {
                    return t = t.replace(oe, d), function (e) {
                        return -1 < (e.textContent || r(e)).indexOf(t);
                    };
                }), lang: ce(function (i) {
                    return K.test(i || "") || ae.error("unsupported lang: " + i), i = i.replace(oe, d).toLowerCase(), function (e) {
                        var t;do {
                            if (t = C ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === i || 0 === t.indexOf(i + "-");
                        } while ((e = e.parentNode) && 1 === e.nodeType);return !1;
                    };
                }), target: function target(e) {
                    var t = i.location && i.location.hash;return t && t.slice(1) === e.id;
                }, root: function root(e) {
                    return e === s;
                }, focus: function focus(e) {
                    return e === E.activeElement && (!E.hasFocus || E.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                }, enabled: fe(!1), disabled: fe(!0), checked: function checked(e) {
                    var t = e.nodeName.toLowerCase();return "input" === t && !!e.checked || "option" === t && !!e.selected;
                }, selected: function selected(e) {
                    return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
                }, empty: function empty(e) {
                    for (e = e.firstChild; e; e = e.nextSibling) {
                        if (e.nodeType < 6) return !1;
                    }return !0;
                }, parent: function parent(e) {
                    return !_.pseudos.empty(e);
                }, header: function header(e) {
                    return ee.test(e.nodeName);
                }, input: function input(e) {
                    return Z.test(e.nodeName);
                }, button: function button(e) {
                    var t = e.nodeName.toLowerCase();return "input" === t && "button" === e.type || "button" === t;
                }, text: function text(e) {
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (e = e.getAttribute("type")) || "text" === e.toLowerCase());
                }, first: pe(function () {
                    return [0];
                }), last: pe(function (e, t) {
                    return [t - 1];
                }), eq: pe(function (e, t, i) {
                    return [i < 0 ? i + t : i];
                }), even: pe(function (e, t) {
                    for (var i = 0; i < t; i += 2) {
                        e.push(i);
                    }return e;
                }), odd: pe(function (e, t) {
                    for (var i = 1; i < t; i += 2) {
                        e.push(i);
                    }return e;
                }), lt: pe(function (e, t, i) {
                    for (var n = i < 0 ? i + t : t < i ? t : i; 0 <= --n;) {
                        e.push(n);
                    }return e;
                }), gt: pe(function (e, t, i) {
                    for (var n = i < 0 ? i + t : i; ++n < t;) {
                        e.push(n);
                    }return e;
                }) } }).pseudos.nth = _.pseudos.eq, { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
            _.pseudos[e] = function (t) {
                return function (e) {
                    return "input" === e.nodeName.toLowerCase() && e.type === t;
                };
            }(e);
        }for (e in { submit: !0, reset: !0 }) {
            _.pseudos[e] = function (i) {
                return function (e) {
                    var t = e.nodeName.toLowerCase();return ("input" === t || "button" === t) && e.type === i;
                };
            }(e);
        }function ge() {}function ve(e) {
            for (var t = 0, i = e.length, n = ""; t < i; t++) {
                n += e[t].value;
            }return n;
        }function ye(s, e, t) {
            var a = e.dir,
                l = e.next,
                c = l || a,
                u = t && "parentNode" === c,
                d = S++;return e.first ? function (e, t, i) {
                for (; e = e[a];) {
                    if (1 === e.nodeType || u) return s(e, t, i);
                }return !1;
            } : function (e, t, i) {
                var n,
                    o,
                    r = [T, d];if (i) {
                    for (; e = e[a];) {
                        if ((1 === e.nodeType || u) && s(e, t, i)) return !0;
                    }
                } else for (; e = e[a];) {
                    if (1 === e.nodeType || u) if (n = (o = e[k] || (e[k] = {}))[e.uniqueID] || (o[e.uniqueID] = {}), l && l === e.nodeName.toLowerCase()) e = e[a] || e;else {
                        if ((o = n[c]) && o[0] === T && o[1] === d) return r[2] = o[2];if ((n[c] = r)[2] = s(e, t, i)) return !0;
                    }
                }return !1;
            };
        }function be(o) {
            return 1 < o.length ? function (e, t, i) {
                for (var n = o.length; n--;) {
                    if (!o[n](e, t, i)) return !1;
                }return !0;
            } : o[0];
        }function _e(e, t, i, n, o) {
            for (var r, s = [], a = 0, l = e.length, c = null != t; a < l; a++) {
                (r = e[a]) && (i && !i(r, n, o) || (s.push(r), c && t.push(a)));
            }return s;
        }function we(f, p, m, g, v, e) {
            return g && !g[k] && (g = we(g)), v && !v[k] && (v = we(v, e)), ce(function (e, t, i, n) {
                var o,
                    r,
                    s,
                    a = [],
                    l = [],
                    c = t.length,
                    u = e || function (e, t, i) {
                    for (var n = 0, o = t.length; n < o; n++) {
                        ae(e, t[n], i);
                    }return i;
                }(p || "*", i.nodeType ? [i] : i, []),
                    d = !f || !e && p ? u : _e(u, a, f, i, n),
                    h = m ? v || (e ? f : c || g) ? [] : t : d;if (m && m(d, h, i, n), g) for (o = _e(h, l), g(o, [], i, n), r = o.length; r--;) {
                    (s = o[r]) && (h[l[r]] = !(d[l[r]] = s));
                }if (e) {
                    if (v || f) {
                        if (v) {
                            for (o = [], r = h.length; r--;) {
                                (s = h[r]) && o.push(d[r] = s);
                            }v(null, h = [], o, n);
                        }for (r = h.length; r--;) {
                            (s = h[r]) && -1 < (o = v ? F(e, s) : a[r]) && (e[o] = !(t[o] = s));
                        }
                    }
                } else h = _e(h === t ? h.splice(c, h.length) : h), v ? v(null, t, h, n) : R.apply(t, h);
            });
        }function xe(g, v) {
            function e(e, t, i, n, o) {
                var r,
                    s,
                    a,
                    l = 0,
                    c = "0",
                    u = e && [],
                    d = [],
                    h = w,
                    f = e || b && _.find.TAG("*", o),
                    p = T += null == h ? 1 : Math.random() || .1,
                    m = f.length;for (o && (w = t == E || t || o); c !== m && null != (r = f[c]); c++) {
                    if (b && r) {
                        for (s = 0, t || r.ownerDocument == E || (x(r), i = !C); a = g[s++];) {
                            if (a(r, t || E, i)) {
                                n.push(r);break;
                            }
                        }o && (T = p);
                    }y && ((r = !a && r) && l--, e && u.push(r));
                }if (l += c, y && c !== l) {
                    for (s = 0; a = v[s++];) {
                        a(u, d, t, i);
                    }if (e) {
                        if (0 < l) for (; c--;) {
                            u[c] || d[c] || (d[c] = j.call(n));
                        }d = _e(d);
                    }R.apply(n, d), o && !e && 0 < d.length && 1 < l + v.length && ae.uniqueSort(n);
                }return o && (T = p, w = h), u;
            }var y = 0 < v.length,
                b = 0 < g.length;return y ? ce(e) : e;
        }return ge.prototype = _.filters = _.pseudos, _.setFilters = new ge(), p = ae.tokenize = function (e, t) {
            var i,
                n,
                o,
                r,
                s,
                a,
                l,
                c = A[e + " "];if (c) return t ? 0 : c.slice(0);for (s = e, a = [], l = _.preFilter; s;) {
                for (r in i && !(n = V.exec(s)) || (n && (s = s.slice(n[0].length) || s), a.push(o = [])), i = !1, (n = Q.exec(s)) && (i = n.shift(), o.push({ value: i, type: n[0].replace($, " ") }), s = s.slice(i.length)), _.filter) {
                    !(n = G[r].exec(s)) || l[r] && !(n = l[r](n)) || (i = n.shift(), o.push({ value: i, type: r, matches: n }), s = s.slice(i.length));
                }if (!i) break;
            }return t ? s.length : s ? ae.error(e) : A(e, a).slice(0);
        }, m = ae.compile = function (e, t) {
            var i,
                n = [],
                o = [],
                r = L[e + " "];if (!r) {
                for (i = (t = t || p(e)).length; i--;) {
                    ((r = function e(t) {
                        for (var n, i, o, r = t.length, s = _.relative[t[0].type], a = s || _.relative[" "], l = s ? 1 : 0, c = ye(function (e) {
                            return e === n;
                        }, a, !0), u = ye(function (e) {
                            return -1 < F(n, e);
                        }, a, !0), d = [function (e, t, i) {
                            return i = !s && (i || t !== w) || ((n = t).nodeType ? c : u)(e, t, i), n = null, i;
                        }]; l < r; l++) {
                            if (i = _.relative[t[l].type]) d = [ye(be(d), i)];else {
                                if ((i = _.filter[t[l].type].apply(null, t[l].matches))[k]) {
                                    for (o = ++l; o < r && !_.relative[t[o].type]; o++) {}return we(1 < l && be(d), 1 < l && ve(t.slice(0, l - 1).concat({ value: " " === t[l - 2].type ? "*" : "" })).replace($, "$1"), i, l < o && e(t.slice(l, o)), o < r && e(t = t.slice(o)), o < r && ve(t));
                                }d.push(i);
                            }
                        }return be(d);
                    }(t[i]))[k] ? n : o).push(r);
                }(r = L(e, xe(o, n))).selector = e;
            }return r;
        }, g = ae.select = function (e, t, i, n) {
            var o,
                r,
                s,
                a,
                l,
                c = "function" == typeof e && e,
                u = !n && p(e = c.selector || e);if (i = i || [], 1 === u.length) {
                if (2 < (r = u[0] = u[0].slice(0)).length && "ID" === (s = r[0]).type && 9 === t.nodeType && C && _.relative[r[1].type]) {
                    if (!(t = (_.find.ID(s.matches[0].replace(oe, d), t) || [])[0])) return i;c && (t = t.parentNode), e = e.slice(r.shift().value.length);
                }for (o = G.needsContext.test(e) ? 0 : r.length; o-- && (s = r[o], !_.relative[a = s.type]);) {
                    if ((l = _.find[a]) && (n = l(s.matches[0].replace(oe, d), ne.test(r[0].type) && me(t.parentNode) || t))) {
                        if (r.splice(o, 1), !(e = n.length && ve(r))) return R.apply(i, n), i;break;
                    }
                }
            }return (c || m(e, u))(n, t, !C, i, !t || ne.test(e) && me(t.parentNode) || t), i;
        }, f.sortStable = k.split("").sort(I).join("") === k, f.detectDuplicates = !!c, x(), f.sortDetached = ue(function (e) {
            return 1 & e.compareDocumentPosition(E.createElement("fieldset"));
        }), ue(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
        }) || de("type|href|height|width", function (e, t, i) {
            if (!i) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
        }), f.attributes && ue(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
        }) || de("value", function (e, t, i) {
            if (!i && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
        }), ue(function (e) {
            return null == e.getAttribute("disabled");
        }) || de(M, function (e, t, i) {
            if (!i) return !0 === e[t] ? t.toLowerCase() : (t = e.getAttributeNode(t)) && t.specified ? t.value : null;
        }), ae;
    }(x);C.find = f, C.expr = f.selectors, C.expr[":"] = C.expr.pseudos, C.uniqueSort = C.unique = f.uniqueSort, C.text = f.getText, C.isXMLDoc = f.isXML, C.contains = f.contains, C.escapeSelector = f.escape;function w(e, t, i) {
        for (var n = [], o = void 0 !== i; (e = e[t]) && 9 !== e.nodeType;) {
            if (1 === e.nodeType) {
                if (o && C(e).is(i)) break;n.push(e);
            }
        }return n;
    }function k(e, t) {
        for (var i = []; e; e = e.nextSibling) {
            1 === e.nodeType && e !== t && i.push(e);
        }return i;
    }var T = C.expr.match.needsContext;function S(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
    }var D = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function A(e, i, n) {
        return m(i) ? C.grep(e, function (e, t) {
            return !!i.call(e, t, e) !== n;
        }) : i.nodeType ? C.grep(e, function (e) {
            return e === i !== n;
        }) : "string" != typeof i ? C.grep(e, function (e) {
            return -1 < o.call(i, e) !== n;
        }) : C.filter(i, e, n);
    }C.filter = function (e, t, i) {
        var n = t[0];return i && (e = ":not(" + e + ")"), 1 === t.length && 1 === n.nodeType ? C.find.matchesSelector(n, e) ? [n] : [] : C.find.matches(e, C.grep(t, function (e) {
            return 1 === e.nodeType;
        }));
    }, C.fn.extend({ find: function find(e) {
            var t,
                i,
                n = this.length,
                o = this;if ("string" != typeof e) return this.pushStack(C(e).filter(function () {
                for (t = 0; t < n; t++) {
                    if (C.contains(o[t], this)) return !0;
                }
            }));for (i = this.pushStack([]), t = 0; t < n; t++) {
                C.find(e, o[t], i);
            }return 1 < n ? C.uniqueSort(i) : i;
        }, filter: function filter(e) {
            return this.pushStack(A(this, e || [], !1));
        }, not: function not(e) {
            return this.pushStack(A(this, e || [], !0));
        }, is: function is(e) {
            return !!A(this, "string" == typeof e && T.test(e) ? C(e) : e || [], !1).length;
        } });var L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(C.fn.init = function (e, t, i) {
        if (!e) return this;if (i = i || N, "string" != typeof e) return e.nodeType ? (this[0] = e, this.length = 1, this) : m(e) ? void 0 !== i.ready ? i.ready(e) : e(C) : C.makeArray(e, this);if (!(n = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : L.exec(e)) || !n[1] && t) return (!t || t.jquery ? t || i : this.constructor(t)).find(e);if (n[1]) {
            if (t = t instanceof C ? t[0] : t, C.merge(this, C.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : E, !0)), D.test(n[1]) && C.isPlainObject(t)) for (var n in t) {
                m(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
            }return this;
        }return (e = E.getElementById(n[2])) && (this[0] = e, this.length = 1), this;
    }).prototype = C.fn;var N = C(E),
        I = /^(?:parents|prev(?:Until|All))/,
        P = { children: !0, contents: !0, next: !0, prev: !0 };function j(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType;) {}return e;
    }C.fn.extend({ has: function has(e) {
            var t = C(e, this),
                i = t.length;return this.filter(function () {
                for (var e = 0; e < i; e++) {
                    if (C.contains(this, t[e])) return !0;
                }
            });
        }, closest: function closest(e, t) {
            var i,
                n = 0,
                o = this.length,
                r = [],
                s = "string" != typeof e && C(e);if (!T.test(e)) for (; n < o; n++) {
                for (i = this[n]; i && i !== t; i = i.parentNode) {
                    if (i.nodeType < 11 && (s ? -1 < s.index(i) : 1 === i.nodeType && C.find.matchesSelector(i, e))) {
                        r.push(i);break;
                    }
                }
            }return this.pushStack(1 < r.length ? C.uniqueSort(r) : r);
        }, index: function index(e) {
            return e ? "string" == typeof e ? o.call(C(e), this[0]) : o.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        }, add: function add(e, t) {
            return this.pushStack(C.uniqueSort(C.merge(this.get(), C(e, t))));
        }, addBack: function addBack(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
        } }), C.each({ parent: function parent(e) {
            e = e.parentNode;return e && 11 !== e.nodeType ? e : null;
        }, parents: function parents(e) {
            return w(e, "parentNode");
        }, parentsUntil: function parentsUntil(e, t, i) {
            return w(e, "parentNode", i);
        }, next: function next(e) {
            return j(e, "nextSibling");
        }, prev: function prev(e) {
            return j(e, "previousSibling");
        }, nextAll: function nextAll(e) {
            return w(e, "nextSibling");
        }, prevAll: function prevAll(e) {
            return w(e, "previousSibling");
        }, nextUntil: function nextUntil(e, t, i) {
            return w(e, "nextSibling", i);
        }, prevUntil: function prevUntil(e, t, i) {
            return w(e, "previousSibling", i);
        }, siblings: function siblings(e) {
            return k((e.parentNode || {}).firstChild, e);
        }, children: function children(e) {
            return k(e.firstChild);
        }, contents: function contents(e) {
            return null != e.contentDocument && i(e.contentDocument) ? e.contentDocument : (S(e, "template") && (e = e.content || e), C.merge([], e.childNodes));
        } }, function (n, o) {
        C.fn[n] = function (e, t) {
            var i = C.map(this, o, e);return (t = "Until" !== n.slice(-5) ? e : t) && "string" == typeof t && (i = C.filter(t, i)), 1 < this.length && (P[n] || C.uniqueSort(i), I.test(n) && i.reverse()), this.pushStack(i);
        };
    });var O = /[^\x20\t\r\n\f]+/g;function R(e) {
        return e;
    }function q(e) {
        throw e;
    }function F(e, t, i, n) {
        var o;try {
            e && m(o = e.promise) ? o.call(e).done(t).fail(i) : e && m(o = e.then) ? o.call(e, t, i) : t.apply(void 0, [e].slice(n));
        } catch (e) {
            i.apply(void 0, [e]);
        }
    }C.Callbacks = function (n) {
        var e, i;n = "string" == typeof n ? (e = n, i = {}, C.each(e.match(O) || [], function (e, t) {
            i[t] = !0;
        }), i) : C.extend({}, n);function o() {
            for (a = a || n.once, s = r = !0; c.length; u = -1) {
                for (t = c.shift(); ++u < l.length;) {
                    !1 === l[u].apply(t[0], t[1]) && n.stopOnFalse && (u = l.length, t = !1);
                }
            }n.memory || (t = !1), r = !1, a && (l = t ? [] : "");
        }var r,
            t,
            s,
            a,
            l = [],
            c = [],
            u = -1,
            d = { add: function add() {
                return l && (t && !r && (u = l.length - 1, c.push(t)), function i(e) {
                    C.each(e, function (e, t) {
                        m(t) ? n.unique && d.has(t) || l.push(t) : t && t.length && "string" !== p(t) && i(t);
                    });
                }(arguments), t && !r && o()), this;
            }, remove: function remove() {
                return C.each(arguments, function (e, t) {
                    for (var i; -1 < (i = C.inArray(t, l, i));) {
                        l.splice(i, 1), i <= u && u--;
                    }
                }), this;
            }, has: function has(e) {
                return e ? -1 < C.inArray(e, l) : 0 < l.length;
            }, empty: function empty() {
                return l = l && [], this;
            }, disable: function disable() {
                return a = c = [], l = t = "", this;
            }, disabled: function disabled() {
                return !l;
            }, lock: function lock() {
                return a = c = [], t || r || (l = t = ""), this;
            }, locked: function locked() {
                return !!a;
            }, fireWith: function fireWith(e, t) {
                return a || (t = [e, (t = t || []).slice ? t.slice() : t], c.push(t), r || o()), this;
            }, fire: function fire() {
                return d.fireWith(this, arguments), this;
            }, fired: function fired() {
                return !!s;
            } };return d;
    }, C.extend({ Deferred: function Deferred(e) {
            var r = [["notify", "progress", C.Callbacks("memory"), C.Callbacks("memory"), 2], ["resolve", "done", C.Callbacks("once memory"), C.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", C.Callbacks("once memory"), C.Callbacks("once memory"), 1, "rejected"]],
                o = "pending",
                s = { state: function state() {
                    return o;
                }, always: function always() {
                    return a.done(arguments).fail(arguments), this;
                }, catch: function _catch(e) {
                    return s.then(null, e);
                }, pipe: function pipe() {
                    var o = arguments;return C.Deferred(function (n) {
                        C.each(r, function (e, t) {
                            var i = m(o[t[4]]) && o[t[4]];a[t[1]](function () {
                                var e = i && i.apply(this, arguments);e && m(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[t[0] + "With"](this, i ? [e] : arguments);
                            });
                        }), o = null;
                    }).promise();
                }, then: function then(t, i, n) {
                    var l = 0;function c(o, r, s, a) {
                        return function () {
                            function e() {
                                var e, t;if (!(o < l)) {
                                    if ((e = s.apply(i, n)) === r.promise()) throw new TypeError("Thenable self-resolution");t = e && ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || "function" == typeof e) && e.then, m(t) ? a ? t.call(e, c(l, r, R, a), c(l, r, q, a)) : (l++, t.call(e, c(l, r, R, a), c(l, r, q, a), c(l, r, R, r.notifyWith))) : (s !== R && (i = void 0, n = [e]), (a || r.resolveWith)(i, n));
                                }
                            }var i = this,
                                n = arguments,
                                t = a ? e : function () {
                                try {
                                    e();
                                } catch (e) {
                                    C.Deferred.exceptionHook && C.Deferred.exceptionHook(e, t.stackTrace), l <= o + 1 && (s !== q && (i = void 0, n = [e]), r.rejectWith(i, n));
                                }
                            };o ? t() : (C.Deferred.getStackHook && (t.stackTrace = C.Deferred.getStackHook()), x.setTimeout(t));
                        };
                    }return C.Deferred(function (e) {
                        r[0][3].add(c(0, e, m(n) ? n : R, e.notifyWith)), r[1][3].add(c(0, e, m(t) ? t : R)), r[2][3].add(c(0, e, m(i) ? i : q));
                    }).promise();
                }, promise: function promise(e) {
                    return null != e ? C.extend(e, s) : s;
                } },
                a = {};return C.each(r, function (e, t) {
                var i = t[2],
                    n = t[5];s[t[1]] = i.add, n && i.add(function () {
                    o = n;
                }, r[3 - e][2].disable, r[3 - e][3].disable, r[0][2].lock, r[0][3].lock), i.add(t[3].fire), a[t[0]] = function () {
                    return a[t[0] + "With"](this === a ? void 0 : this, arguments), this;
                }, a[t[0] + "With"] = i.fireWith;
            }), s.promise(a), e && e.call(a, a), a;
        }, when: function when(e) {
            function t(t) {
                return function (e) {
                    o[t] = this, r[t] = 1 < arguments.length ? a.call(arguments) : e, --i || s.resolveWith(o, r);
                };
            }var i = arguments.length,
                n = i,
                o = Array(n),
                r = a.call(arguments),
                s = C.Deferred();if (i <= 1 && (F(e, s.done(t(n)).resolve, s.reject, !i), "pending" === s.state() || m(r[n] && r[n].then))) return s.then();for (; n--;) {
                F(r[n], t(n), s.reject);
            }return s.promise();
        } });var M = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;C.Deferred.exceptionHook = function (e, t) {
        x.console && x.console.warn && e && M.test(e.name) && x.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
    }, C.readyException = function (e) {
        x.setTimeout(function () {
            throw e;
        });
    };var H = C.Deferred();function z() {
        E.removeEventListener("DOMContentLoaded", z), x.removeEventListener("load", z), C.ready();
    }C.fn.ready = function (e) {
        return H.then(e).catch(function (e) {
            C.readyException(e);
        }), this;
    }, C.extend({ isReady: !1, readyWait: 1, ready: function ready(e) {
            (!0 === e ? --C.readyWait : C.isReady) || (C.isReady = !0) !== e && 0 < --C.readyWait || H.resolveWith(E, [C]);
        } }), C.ready.then = H.then, "complete" === E.readyState || "loading" !== E.readyState && !E.documentElement.doScroll ? x.setTimeout(C.ready) : (E.addEventListener("DOMContentLoaded", z), x.addEventListener("load", z));function B(e, t, i, n, o, r, s) {
        var a = 0,
            l = e.length,
            c = null == i;if ("object" === p(i)) for (a in o = !0, i) {
            B(e, t, a, i[a], !0, r, s);
        } else if (void 0 !== n && (o = !0, m(n) || (s = !0), t = c ? s ? (t.call(e, n), null) : (c = t, function (e, t, i) {
            return c.call(C(e), i);
        }) : t)) for (; a < l; a++) {
            t(e[a], i, s ? n : n.call(e[a], a, t(e[a], i)));
        }return o ? e : c ? t.call(e) : l ? t(e[0], i) : r;
    }var W = /^-ms-/,
        U = /-([a-z])/g;function $(e, t) {
        return t.toUpperCase();
    }function V(e) {
        return e.replace(W, "ms-").replace(U, $);
    }function Q(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    }function X() {
        this.expando = C.expando + X.uid++;
    }X.uid = 1, X.prototype = { cache: function cache(e) {
            var t = e[this.expando];return t || (t = {}, Q(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, { value: t, configurable: !0 }))), t;
        }, set: function set(e, t, i) {
            var n,
                o = this.cache(e);if ("string" == typeof t) o[V(t)] = i;else for (n in t) {
                o[V(n)] = t[n];
            }return o;
        }, get: function get(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][V(t)];
        }, access: function access(e, t, i) {
            return void 0 === t || t && "string" == typeof t && void 0 === i ? this.get(e, t) : (this.set(e, t, i), void 0 !== i ? i : t);
        }, remove: function remove(e, t) {
            var i,
                n = e[this.expando];if (void 0 !== n) {
                if (void 0 !== t) {
                    i = (t = Array.isArray(t) ? t.map(V) : (t = V(t)) in n ? [t] : t.match(O) || []).length;for (; i--;) {
                        delete n[t[i]];
                    }
                }void 0 !== t && !C.isEmptyObject(n) || (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
            }
        }, hasData: function hasData(e) {
            e = e[this.expando];return void 0 !== e && !C.isEmptyObject(e);
        } };var Y = new X(),
        K = new X(),
        G = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        J = /[A-Z]/g;function Z(e, t, i) {
        var n, o;if (void 0 === i && 1 === e.nodeType) if (n = "data-" + t.replace(J, "-$&").toLowerCase(), "string" == typeof (i = e.getAttribute(n))) {
            try {
                i = "true" === (o = i) || "false" !== o && ("null" === o ? null : o === +o + "" ? +o : G.test(o) ? JSON.parse(o) : o);
            } catch (e) {}K.set(e, t, i);
        } else i = void 0;return i;
    }C.extend({ hasData: function hasData(e) {
            return K.hasData(e) || Y.hasData(e);
        }, data: function data(e, t, i) {
            return K.access(e, t, i);
        }, removeData: function removeData(e, t) {
            K.remove(e, t);
        }, _data: function _data(e, t, i) {
            return Y.access(e, t, i);
        }, _removeData: function _removeData(e, t) {
            Y.remove(e, t);
        } }), C.fn.extend({ data: function data(i, e) {
            var t,
                n,
                o,
                r = this[0],
                s = r && r.attributes;if (void 0 !== i) return "object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) ? this.each(function () {
                K.set(this, i);
            }) : B(this, function (e) {
                var t;return r && void 0 === e ? void 0 !== (t = K.get(r, i)) || void 0 !== (t = Z(r, i)) ? t : void 0 : void this.each(function () {
                    K.set(this, i, e);
                });
            }, null, e, 1 < arguments.length, null, !0);if (this.length && (o = K.get(r), 1 === r.nodeType && !Y.get(r, "hasDataAttrs"))) {
                for (t = s.length; t--;) {
                    s[t] && 0 === (n = s[t].name).indexOf("data-") && (n = V(n.slice(5)), Z(r, n, o[n]));
                }Y.set(r, "hasDataAttrs", !0);
            }return o;
        }, removeData: function removeData(e) {
            return this.each(function () {
                K.remove(this, e);
            });
        } }), C.extend({ queue: function queue(e, t, i) {
            var n;if (e) return n = Y.get(e, t = (t || "fx") + "queue"), i && (!n || Array.isArray(i) ? n = Y.access(e, t, C.makeArray(i)) : n.push(i)), n || [];
        }, dequeue: function dequeue(e, t) {
            t = t || "fx";var i = C.queue(e, t),
                n = i.length,
                o = i.shift(),
                r = C._queueHooks(e, t);"inprogress" === o && (o = i.shift(), n--), o && ("fx" === t && i.unshift("inprogress"), delete r.stop, o.call(e, function () {
                C.dequeue(e, t);
            }, r)), !n && r && r.empty.fire();
        }, _queueHooks: function _queueHooks(e, t) {
            var i = t + "queueHooks";return Y.get(e, i) || Y.access(e, i, { empty: C.Callbacks("once memory").add(function () {
                    Y.remove(e, [t + "queue", i]);
                }) });
        } }), C.fn.extend({ queue: function queue(t, i) {
            var e = 2;return "string" != typeof t && (i = t, t = "fx", e--), arguments.length < e ? C.queue(this[0], t) : void 0 === i ? this : this.each(function () {
                var e = C.queue(this, t, i);C._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && C.dequeue(this, t);
            });
        }, dequeue: function dequeue(e) {
            return this.each(function () {
                C.dequeue(this, e);
            });
        }, clearQueue: function clearQueue(e) {
            return this.queue(e || "fx", []);
        }, promise: function promise(e, t) {
            function i() {
                --o || r.resolveWith(s, [s]);
            }var n,
                o = 1,
                r = C.Deferred(),
                s = this,
                a = this.length;for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) {
                (n = Y.get(s[a], e + "queueHooks")) && n.empty && (o++, n.empty.add(i));
            }return i(), r.promise(t);
        } });var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
        ie = ["Top", "Right", "Bottom", "Left"],
        ne = E.documentElement,
        oe = function oe(e) {
        return C.contains(e.ownerDocument, e);
    },
        re = { composed: !0 };ne.getRootNode && (oe = function oe(e) {
        return C.contains(e.ownerDocument, e) || e.getRootNode(re) === e.ownerDocument;
    });function se(e, t) {
        return "none" === (e = t || e).style.display || "" === e.style.display && oe(e) && "none" === C.css(e, "display");
    }function ae(e, t, i, n) {
        var o,
            r,
            s = 20,
            a = n ? function () {
            return n.cur();
        } : function () {
            return C.css(e, t, "");
        },
            l = a(),
            c = i && i[3] || (C.cssNumber[t] ? "" : "px"),
            u = e.nodeType && (C.cssNumber[t] || "px" !== c && +l) && te.exec(C.css(e, t));if (u && u[3] !== c) {
            for (c = c || u[3], u = +(l /= 2) || 1; s--;) {
                C.style(e, t, u + c), (1 - r) * (1 - (r = a() / l || .5)) <= 0 && (s = 0), u /= r;
            }C.style(e, t, (u *= 2) + c), i = i || [];
        }return i && (u = +u || +l || 0, o = i[1] ? u + (i[1] + 1) * i[2] : +i[2], n && (n.unit = c, n.start = u, n.end = o)), o;
    }var le = {};function ce(e, t) {
        for (var i, n, o, r, s, a = [], l = 0, c = e.length; l < c; l++) {
            (n = e[l]).style && (i = n.style.display, t ? ("none" === i && (a[l] = Y.get(n, "display") || null, a[l] || (n.style.display = "")), "" === n.style.display && se(n) && (a[l] = (s = r = void 0, r = (o = n).ownerDocument, s = o.nodeName, (o = le[s]) || (r = r.body.appendChild(r.createElement(s)), o = C.css(r, "display"), r.parentNode.removeChild(r), le[s] = o = "none" === o ? "block" : o)))) : "none" !== i && (a[l] = "none", Y.set(n, "display", i)));
        }for (l = 0; l < c; l++) {
            null != a[l] && (e[l].style.display = a[l]);
        }return e;
    }C.fn.extend({ show: function show() {
            return ce(this, !0);
        }, hide: function hide() {
            return ce(this);
        }, toggle: function toggle(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                se(this) ? C(this).show() : C(this).hide();
            });
        } });var ue = /^(?:checkbox|radio)$/i,
        de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
        he = /^$|^module$|\/(?:java|ecma)script/i;d = E.createDocumentFragment().appendChild(E.createElement("div")), (f = E.createElement("input")).setAttribute("type", "radio"), f.setAttribute("checked", "checked"), f.setAttribute("name", "t"), d.appendChild(f), b.checkClone = d.cloneNode(!0).cloneNode(!0).lastChild.checked, d.innerHTML = "<textarea>x</textarea>", b.noCloneChecked = !!d.cloneNode(!0).lastChild.defaultValue, d.innerHTML = "<option></option>", b.option = !!d.lastChild;var fe = { thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };function pe(e, t) {
        var i = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [];return void 0 === t || t && S(e, t) ? C.merge([e], i) : i;
    }function me(e, t) {
        for (var i = 0, n = e.length; i < n; i++) {
            Y.set(e[i], "globalEval", !t || Y.get(t[i], "globalEval"));
        }
    }fe.tbody = fe.tfoot = fe.colgroup = fe.caption = fe.thead, fe.th = fe.td, b.option || (fe.optgroup = fe.option = [1, "<select multiple='multiple'>", "</select>"]);var ge = /<|&#?\w+;/;function ve(e, t, i, n, o) {
        for (var r, s, a, l, c, u = t.createDocumentFragment(), d = [], h = 0, f = e.length; h < f; h++) {
            if ((r = e[h]) || 0 === r) if ("object" === p(r)) C.merge(d, r.nodeType ? [r] : r);else if (ge.test(r)) {
                for (s = s || u.appendChild(t.createElement("div")), a = (de.exec(r) || ["", ""])[1].toLowerCase(), a = fe[a] || fe._default, s.innerHTML = a[1] + C.htmlPrefilter(r) + a[2], c = a[0]; c--;) {
                    s = s.lastChild;
                }C.merge(d, s.childNodes), (s = u.firstChild).textContent = "";
            } else d.push(t.createTextNode(r));
        }for (u.textContent = "", h = 0; r = d[h++];) {
            if (n && -1 < C.inArray(r, n)) o && o.push(r);else if (l = oe(r), s = pe(u.appendChild(r), "script"), l && me(s), i) for (c = 0; r = s[c++];) {
                he.test(r.type || "") && i.push(r);
            }
        }return u;
    }var ye = /^key/,
        be = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        _e = /^([^.]*)(?:\.(.+)|)/;function we() {
        return !0;
    }function xe() {
        return !1;
    }function Ee(e, t) {
        return e === function () {
            try {
                return E.activeElement;
            } catch (e) {}
        }() == ("focus" === t);
    }function Ce(e, t, i, n, o, r) {
        var s, a;if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) {
            for (a in "string" != typeof i && (n = n || i, i = void 0), t) {
                Ce(e, a, i, n, t[a], r);
            }return e;
        }if (null == n && null == o ? (o = i, n = i = void 0) : null == o && ("string" == typeof i ? (o = n, n = void 0) : (o = n, n = i, i = void 0)), !1 === o) o = xe;else if (!o) return e;return 1 === r && (s = o, (o = function o(e) {
            return C().off(e), s.apply(this, arguments);
        }).guid = s.guid || (s.guid = C.guid++)), e.each(function () {
            C.event.add(this, t, o, n, i);
        });
    }function ke(e, o, r) {
        r ? (Y.set(e, o, !1), C.event.add(e, o, { namespace: !1, handler: function handler(e) {
                var t,
                    i,
                    n = Y.get(this, o);if (1 & e.isTrigger && this[o]) {
                    if (n.length) (C.event.special[o] || {}).delegateType && e.stopPropagation();else if (n = a.call(arguments), Y.set(this, o, n), t = r(this, o), this[o](), n !== (i = Y.get(this, o)) || t ? Y.set(this, o, !1) : i = {}, n !== i) return e.stopImmediatePropagation(), e.preventDefault(), i.value;
                } else n.length && (Y.set(this, o, { value: C.event.trigger(C.extend(n[0], C.Event.prototype), n.slice(1), this) }), e.stopImmediatePropagation());
            } })) : void 0 === Y.get(e, o) && C.event.add(e, o, we);
    }C.event = { global: {}, add: function add(t, e, i, n, o) {
            var r,
                s,
                a,
                l,
                c,
                u,
                d,
                h,
                f,
                p = Y.get(t);if (Q(t)) for (i.handler && (i = (r = i).handler, o = r.selector), o && C.find.matchesSelector(ne, o), i.guid || (i.guid = C.guid++), (a = p.events) || (a = p.events = Object.create(null)), (s = p.handle) || (s = p.handle = function (e) {
                return void 0 !== C && C.event.triggered !== e.type ? C.event.dispatch.apply(t, arguments) : void 0;
            }), l = (e = (e || "").match(O) || [""]).length; l--;) {
                d = f = (c = _e.exec(e[l]) || [])[1], h = (c[2] || "").split(".").sort(), d && (u = C.event.special[d] || {}, d = (o ? u.delegateType : u.bindType) || d, u = C.event.special[d] || {}, c = C.extend({ type: d, origType: f, data: n, handler: i, guid: i.guid, selector: o, needsContext: o && C.expr.match.needsContext.test(o), namespace: h.join(".") }, r), (f = a[d]) || ((f = a[d] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(t, n, h, s) || t.addEventListener && t.addEventListener(d, s)), u.add && (u.add.call(t, c), c.handler.guid || (c.handler.guid = i.guid)), o ? f.splice(f.delegateCount++, 0, c) : f.push(c), C.event.global[d] = !0);
            }
        }, remove: function remove(e, t, i, n, o) {
            var r,
                s,
                a,
                l,
                c,
                u,
                d,
                h,
                f,
                p,
                m,
                g = Y.hasData(e) && Y.get(e);if (g && (l = g.events)) {
                for (c = (t = (t || "").match(O) || [""]).length; c--;) {
                    if (f = m = (a = _e.exec(t[c]) || [])[1], p = (a[2] || "").split(".").sort(), f) {
                        for (d = C.event.special[f] || {}, h = l[f = (n ? d.delegateType : d.bindType) || f] || [], a = a[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = h.length; r--;) {
                            u = h[r], !o && m !== u.origType || i && i.guid !== u.guid || a && !a.test(u.namespace) || n && n !== u.selector && ("**" !== n || !u.selector) || (h.splice(r, 1), u.selector && h.delegateCount--, d.remove && d.remove.call(e, u));
                        }s && !h.length && (d.teardown && !1 !== d.teardown.call(e, p, g.handle) || C.removeEvent(e, f, g.handle), delete l[f]);
                    } else for (f in l) {
                        C.event.remove(e, f + t[c], i, n, !0);
                    }
                }C.isEmptyObject(l) && Y.remove(e, "handle events");
            }
        }, dispatch: function dispatch(e) {
            var t,
                i,
                n,
                o,
                r,
                s = new Array(arguments.length),
                a = C.event.fix(e),
                l = (Y.get(this, "events") || Object.create(null))[a.type] || [],
                e = C.event.special[a.type] || {};for (s[0] = a, t = 1; t < arguments.length; t++) {
                s[t] = arguments[t];
            }if (a.delegateTarget = this, !e.preDispatch || !1 !== e.preDispatch.call(this, a)) {
                for (r = C.event.handlers.call(this, a, l), t = 0; (n = r[t++]) && !a.isPropagationStopped();) {
                    for (a.currentTarget = n.elem, i = 0; (o = n.handlers[i++]) && !a.isImmediatePropagationStopped();) {
                        a.rnamespace && !1 !== o.namespace && !a.rnamespace.test(o.namespace) || (a.handleObj = o, a.data = o.data, void 0 !== (o = ((C.event.special[o.origType] || {}).handle || o.handler).apply(n.elem, s)) && !1 === (a.result = o) && (a.preventDefault(), a.stopPropagation()));
                    }
                }return e.postDispatch && e.postDispatch.call(this, a), a.result;
            }
        }, handlers: function handlers(e, t) {
            var i,
                n,
                o,
                r,
                s,
                a = [],
                l = t.delegateCount,
                c = e.target;if (l && c.nodeType && !("click" === e.type && 1 <= e.button)) for (; c !== this; c = c.parentNode || this) {
                if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                    for (r = [], s = {}, i = 0; i < l; i++) {
                        void 0 === s[o = (n = t[i]).selector + " "] && (s[o] = n.needsContext ? -1 < C(o, this).index(c) : C.find(o, this, null, [c]).length), s[o] && r.push(n);
                    }r.length && a.push({ elem: c, handlers: r });
                }
            }return c = this, l < t.length && a.push({ elem: c, handlers: t.slice(l) }), a;
        }, addProp: function addProp(t, e) {
            Object.defineProperty(C.Event.prototype, t, { enumerable: !0, configurable: !0, get: m(e) ? function () {
                    if (this.originalEvent) return e(this.originalEvent);
                } : function () {
                    if (this.originalEvent) return this.originalEvent[t];
                }, set: function set(e) {
                    Object.defineProperty(this, t, { enumerable: !0, configurable: !0, writable: !0, value: e });
                } });
        }, fix: function fix(e) {
            return e[C.expando] ? e : new C.Event(e);
        }, special: { load: { noBubble: !0 }, click: { setup: function setup(e) {
                    e = this || e;return ue.test(e.type) && e.click && S(e, "input") && ke(e, "click", we), !1;
                }, trigger: function trigger(e) {
                    e = this || e;return ue.test(e.type) && e.click && S(e, "input") && ke(e, "click"), !0;
                }, _default: function _default(e) {
                    e = e.target;return ue.test(e.type) && e.click && S(e, "input") && Y.get(e, "click") || S(e, "a");
                } }, beforeunload: { postDispatch: function postDispatch(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                } } } }, C.removeEvent = function (e, t, i) {
        e.removeEventListener && e.removeEventListener(t, i);
    }, C.Event = function (e, t) {
        if (!(this instanceof C.Event)) return new C.Event(e, t);e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? we : xe, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && C.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[C.expando] = !0;
    }, C.Event.prototype = { constructor: C.Event, isDefaultPrevented: xe, isPropagationStopped: xe, isImmediatePropagationStopped: xe, isSimulated: !1, preventDefault: function preventDefault() {
            var e = this.originalEvent;this.isDefaultPrevented = we, e && !this.isSimulated && e.preventDefault();
        }, stopPropagation: function stopPropagation() {
            var e = this.originalEvent;this.isPropagationStopped = we, e && !this.isSimulated && e.stopPropagation();
        }, stopImmediatePropagation: function stopImmediatePropagation() {
            var e = this.originalEvent;this.isImmediatePropagationStopped = we, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation();
        } }, C.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, char: !0, code: !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: function which(e) {
            var t = e.button;return null == e.which && ye.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && be.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which;
        } }, C.event.addProp), C.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
        C.event.special[e] = { setup: function setup() {
                return ke(this, e, Ee), !1;
            }, trigger: function trigger() {
                return ke(this, e), !0;
            }, delegateType: t };
    }), C.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (e, o) {
        C.event.special[e] = { delegateType: o, bindType: o, handle: function handle(e) {
                var t,
                    i = e.relatedTarget,
                    n = e.handleObj;return i && (i === this || C.contains(this, i)) || (e.type = n.origType, t = n.handler.apply(this, arguments), e.type = o), t;
            } };
    }), C.fn.extend({ on: function on(e, t, i, n) {
            return Ce(this, e, t, i, n);
        }, one: function one(e, t, i, n) {
            return Ce(this, e, t, i, n, 1);
        }, off: function off(e, t, i) {
            var n, o;if (e && e.preventDefault && e.handleObj) return n = e.handleObj, C(e.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;if ("object" != (typeof e === "undefined" ? "undefined" : _typeof(e))) return !1 !== t && "function" != typeof t || (i = t, t = void 0), !1 === i && (i = xe), this.each(function () {
                C.event.remove(this, e, i, t);
            });for (o in e) {
                this.off(o, t, e[o]);
            }return this;
        } });var Te = /<script|<style|<link/i,
        Se = /checked\s*(?:[^=]|=\s*.checked.)/i,
        De = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Ae(e, t) {
        return S(e, "table") && S(11 !== t.nodeType ? t : t.firstChild, "tr") && C(e).children("tbody")[0] || e;
    }function Le(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
    }function Ne(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e;
    }function Ie(e, t) {
        var i, n, o, r;if (1 === t.nodeType) {
            if (Y.hasData(e) && (r = Y.get(e).events)) for (o in Y.remove(t, "handle events"), r) {
                for (i = 0, n = r[o].length; i < n; i++) {
                    C.event.add(t, o, r[o][i]);
                }
            }K.hasData(e) && (e = K.access(e), e = C.extend({}, e), K.set(t, e));
        }
    }function Pe(i, n, o, r) {
        n = v(n);var e,
            t,
            s,
            a,
            l,
            c,
            u = 0,
            d = i.length,
            h = d - 1,
            f = n[0],
            p = m(f);if (p || 1 < d && "string" == typeof f && !b.checkClone && Se.test(f)) return i.each(function (e) {
            var t = i.eq(e);p && (n[0] = f.call(this, e, t.html())), Pe(t, n, o, r);
        });if (d && (t = (e = ve(n, i[0].ownerDocument, !1, i, r)).firstChild, 1 === e.childNodes.length && (e = t), t || r)) {
            for (a = (s = C.map(pe(e, "script"), Le)).length; u < d; u++) {
                l = e, u !== h && (l = C.clone(l, !0, !0), a && C.merge(s, pe(l, "script"))), o.call(i[u], l, u);
            }if (a) for (c = s[s.length - 1].ownerDocument, C.map(s, Ne), u = 0; u < a; u++) {
                l = s[u], he.test(l.type || "") && !Y.access(l, "globalEval") && C.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? C._evalUrl && !l.noModule && C._evalUrl(l.src, { nonce: l.nonce || l.getAttribute("nonce") }, c) : _(l.textContent.replace(De, ""), l, c));
            }
        }return i;
    }function je(e, t, i) {
        for (var n, o = t ? C.filter(t, e) : e, r = 0; null != (n = o[r]); r++) {
            i || 1 !== n.nodeType || C.cleanData(pe(n)), n.parentNode && (i && oe(n) && me(pe(n, "script")), n.parentNode.removeChild(n));
        }return e;
    }C.extend({ htmlPrefilter: function htmlPrefilter(e) {
            return e;
        }, clone: function clone(e, t, i) {
            var n,
                o,
                r,
                s,
                a,
                l,
                c,
                u = e.cloneNode(!0),
                d = oe(e);if (!(b.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || C.isXMLDoc(e))) for (s = pe(u), n = 0, o = (r = pe(e)).length; n < o; n++) {
                a = r[n], l = s[n], c = void 0, "input" === (c = l.nodeName.toLowerCase()) && ue.test(a.type) ? l.checked = a.checked : "input" !== c && "textarea" !== c || (l.defaultValue = a.defaultValue);
            }if (t) if (i) for (r = r || pe(e), s = s || pe(u), n = 0, o = r.length; n < o; n++) {
                Ie(r[n], s[n]);
            } else Ie(e, u);return 0 < (s = pe(u, "script")).length && me(s, !d && pe(e, "script")), u;
        }, cleanData: function cleanData(e) {
            for (var t, i, n, o = C.event.special, r = 0; void 0 !== (i = e[r]); r++) {
                if (Q(i)) {
                    if (t = i[Y.expando]) {
                        if (t.events) for (n in t.events) {
                            o[n] ? C.event.remove(i, n) : C.removeEvent(i, n, t.handle);
                        }i[Y.expando] = void 0;
                    }i[K.expando] && (i[K.expando] = void 0);
                }
            }
        } }), C.fn.extend({ detach: function detach(e) {
            return je(this, e, !0);
        }, remove: function remove(e) {
            return je(this, e);
        }, text: function text(e) {
            return B(this, function (e) {
                return void 0 === e ? C.text(this) : this.empty().each(function () {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
                });
            }, null, e, arguments.length);
        }, append: function append() {
            return Pe(this, arguments, function (e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Ae(this, e).appendChild(e);
            });
        }, prepend: function prepend() {
            return Pe(this, arguments, function (e) {
                var t;1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (t = Ae(this, e)).insertBefore(e, t.firstChild);
            });
        }, before: function before() {
            return Pe(this, arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this);
            });
        }, after: function after() {
            return Pe(this, arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
            });
        }, empty: function empty() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                1 === e.nodeType && (C.cleanData(pe(e, !1)), e.textContent = "");
            }return this;
        }, clone: function clone(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function () {
                return C.clone(this, e, t);
            });
        }, html: function html(e) {
            return B(this, function (e) {
                var t = this[0] || {},
                    i = 0,
                    n = this.length;if (void 0 === e && 1 === t.nodeType) return t.innerHTML;if ("string" == typeof e && !Te.test(e) && !fe[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = C.htmlPrefilter(e);try {
                        for (; i < n; i++) {
                            1 === (t = this[i] || {}).nodeType && (C.cleanData(pe(t, !1)), t.innerHTML = e);
                        }t = 0;
                    } catch (e) {}
                }t && this.empty().append(e);
            }, null, e, arguments.length);
        }, replaceWith: function replaceWith() {
            var i = [];return Pe(this, arguments, function (e) {
                var t = this.parentNode;C.inArray(this, i) < 0 && (C.cleanData(pe(this)), t && t.replaceChild(e, this));
            }, i);
        } }), C.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, s) {
        C.fn[e] = function (e) {
            for (var t, i = [], n = C(e), o = n.length - 1, r = 0; r <= o; r++) {
                t = r === o ? this : this.clone(!0), C(n[r])[s](t), l.apply(i, t.get());
            }return this.pushStack(i);
        };
    });function Oe(e) {
        var t = e.ownerDocument.defaultView;return (t = !t || !t.opener ? x : t).getComputedStyle(e);
    }function Re(e, t, i) {
        var n,
            o = {};for (n in t) {
            o[n] = e.style[n], e.style[n] = t[n];
        }for (n in i = i.call(e), t) {
            e.style[n] = o[n];
        }return i;
    }var qe,
        Fe,
        Me,
        He,
        ze,
        Be,
        We,
        Ue,
        $e = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
        Ve = new RegExp(ie.join("|"), "i");function Qe() {
        var e;Ue && (We.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", Ue.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ne.appendChild(We).appendChild(Ue), e = x.getComputedStyle(Ue), qe = "1%" !== e.top, Be = 12 === Xe(e.marginLeft), Ue.style.right = "60%", He = 36 === Xe(e.right), Fe = 36 === Xe(e.width), Ue.style.position = "absolute", Me = 12 === Xe(Ue.offsetWidth / 3), ne.removeChild(We), Ue = null);
    }function Xe(e) {
        return Math.round(parseFloat(e));
    }function Ye(e, t, i) {
        var n,
            o,
            r = e.style;return (i = i || Oe(e)) && ("" !== (o = i.getPropertyValue(t) || i[t]) || oe(e) || (o = C.style(e, t)), !b.pixelBoxStyles() && $e.test(o) && Ve.test(t) && (n = r.width, e = r.minWidth, t = r.maxWidth, r.minWidth = r.maxWidth = r.width = o, o = i.width, r.width = n, r.minWidth = e, r.maxWidth = t)), void 0 !== o ? o + "" : o;
    }function Ke(e, t) {
        return { get: function get() {
                if (!e()) return (this.get = t).apply(this, arguments);delete this.get;
            } };
    }We = E.createElement("div"), (Ue = E.createElement("div")).style && (Ue.style.backgroundClip = "content-box", Ue.cloneNode(!0).style.backgroundClip = "", b.clearCloneStyle = "content-box" === Ue.style.backgroundClip, C.extend(b, { boxSizingReliable: function boxSizingReliable() {
            return Qe(), Fe;
        }, pixelBoxStyles: function pixelBoxStyles() {
            return Qe(), He;
        }, pixelPosition: function pixelPosition() {
            return Qe(), qe;
        }, reliableMarginLeft: function reliableMarginLeft() {
            return Qe(), Be;
        }, scrollboxSize: function scrollboxSize() {
            return Qe(), Me;
        }, reliableTrDimensions: function reliableTrDimensions() {
            var e, t, i;return null == ze && (e = E.createElement("table"), i = E.createElement("tr"), t = E.createElement("div"), e.style.cssText = "position:absolute;left:-11111px", i.style.height = "1px", t.style.height = "9px", ne.appendChild(e).appendChild(i).appendChild(t), i = x.getComputedStyle(i), ze = 3 < parseInt(i.height), ne.removeChild(e)), ze;
        } }));var Ge = ["Webkit", "Moz", "ms"],
        Je = E.createElement("div").style,
        Ze = {};function et(e) {
        var t = C.cssProps[e] || Ze[e];return t || (e in Je ? e : Ze[e] = function (e) {
            for (var t = e[0].toUpperCase() + e.slice(1), i = Ge.length; i--;) {
                if ((e = Ge[i] + t) in Je) return e;
            }
        }(e) || e);
    }var tt = /^(none|table(?!-c[ea]).+)/,
        it = /^--/,
        nt = { position: "absolute", visibility: "hidden", display: "block" },
        ot = { letterSpacing: "0", fontWeight: "400" };function rt(e, t, i) {
        var n = te.exec(t);return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : t;
    }function st(e, t, i, n, o, r) {
        var s = "width" === t ? 1 : 0,
            a = 0,
            l = 0;if (i === (n ? "border" : "content")) return 0;for (; s < 4; s += 2) {
            "margin" === i && (l += C.css(e, i + ie[s], !0, o)), n ? ("content" === i && (l -= C.css(e, "padding" + ie[s], !0, o)), "margin" !== i && (l -= C.css(e, "border" + ie[s] + "Width", !0, o))) : (l += C.css(e, "padding" + ie[s], !0, o), "padding" !== i ? l += C.css(e, "border" + ie[s] + "Width", !0, o) : a += C.css(e, "border" + ie[s] + "Width", !0, o));
        }return !n && 0 <= r && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - r - l - a - .5)) || 0), l;
    }function at(e, t, i) {
        var n = Oe(e),
            o = (!b.boxSizingReliable() || i) && "border-box" === C.css(e, "boxSizing", !1, n),
            r = o,
            s = Ye(e, t, n),
            a = "offset" + t[0].toUpperCase() + t.slice(1);if ($e.test(s)) {
            if (!i) return s;s = "auto";
        }return (!b.boxSizingReliable() && o || !b.reliableTrDimensions() && S(e, "tr") || "auto" === s || !parseFloat(s) && "inline" === C.css(e, "display", !1, n)) && e.getClientRects().length && (o = "border-box" === C.css(e, "boxSizing", !1, n), (r = a in e) && (s = e[a])), (s = parseFloat(s) || 0) + st(e, t, i || (o ? "border" : "content"), r, n, s) + "px";
    }function lt(e, t, i, n, o) {
        return new lt.prototype.init(e, t, i, n, o);
    }C.extend({ cssHooks: { opacity: { get: function get(e, t) {
                    if (t) {
                        e = Ye(e, "opacity");return "" === e ? "1" : e;
                    }
                } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, gridArea: !0, gridColumn: !0, gridColumnEnd: !0, gridColumnStart: !0, gridRow: !0, gridRowEnd: !0, gridRowStart: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: {}, style: function style(e, t, i, n) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o,
                    r,
                    s,
                    a = V(t),
                    l = it.test(t),
                    c = e.style;if (l || (t = et(a)), s = C.cssHooks[t] || C.cssHooks[a], void 0 === i) return s && "get" in s && void 0 !== (o = s.get(e, !1, n)) ? o : c[t];"string" === (r = typeof i === "undefined" ? "undefined" : _typeof(i)) && (o = te.exec(i)) && o[1] && (i = ae(e, t, o), r = "number"), null != i && i == i && ("number" !== r || l || (i += o && o[3] || (C.cssNumber[a] ? "" : "px")), b.clearCloneStyle || "" !== i || 0 !== t.indexOf("background") || (c[t] = "inherit"), s && "set" in s && void 0 === (i = s.set(e, i, n)) || (l ? c.setProperty(t, i) : c[t] = i));
            }
        }, css: function css(e, t, i, n) {
            var o,
                r = V(t);return it.test(t) || (t = et(r)), "normal" === (o = void 0 === (o = (r = C.cssHooks[t] || C.cssHooks[r]) && "get" in r ? r.get(e, !0, i) : o) ? Ye(e, t, n) : o) && t in ot && (o = ot[t]), "" === i || i ? (t = parseFloat(o), !0 === i || isFinite(t) ? t || 0 : o) : o;
        } }), C.each(["height", "width"], function (e, a) {
        C.cssHooks[a] = { get: function get(e, t, i) {
                if (t) return !tt.test(C.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? at(e, a, i) : Re(e, nt, function () {
                    return at(e, a, i);
                });
            }, set: function set(e, t, i) {
                var n,
                    o = Oe(e),
                    r = !b.scrollboxSize() && "absolute" === o.position,
                    s = (r || i) && "border-box" === C.css(e, "boxSizing", !1, o),
                    i = i ? st(e, a, i, s, o) : 0;return s && r && (i -= Math.ceil(e["offset" + a[0].toUpperCase() + a.slice(1)] - parseFloat(o[a]) - st(e, a, "border", !1, o) - .5)), i && (n = te.exec(t)) && "px" !== (n[3] || "px") && (e.style[a] = t, t = C.css(e, a)), rt(0, t, i);
            } };
    }), C.cssHooks.marginLeft = Ke(b.reliableMarginLeft, function (e, t) {
        if (t) return (parseFloat(Ye(e, "marginLeft")) || e.getBoundingClientRect().left - Re(e, { marginLeft: 0 }, function () {
            return e.getBoundingClientRect().left;
        })) + "px";
    }), C.each({ margin: "", padding: "", border: "Width" }, function (o, r) {
        C.cssHooks[o + r] = { expand: function expand(e) {
                for (var t = 0, i = {}, n = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) {
                    i[o + ie[t] + r] = n[t] || n[t - 2] || n[0];
                }return i;
            } }, "margin" !== o && (C.cssHooks[o + r].set = rt);
    }), C.fn.extend({ css: function css(e, t) {
            return B(this, function (e, t, i) {
                var n,
                    o,
                    r = {},
                    s = 0;if (Array.isArray(t)) {
                    for (n = Oe(e), o = t.length; s < o; s++) {
                        r[t[s]] = C.css(e, t[s], !1, n);
                    }return r;
                }return void 0 !== i ? C.style(e, t, i) : C.css(e, t);
            }, e, t, 1 < arguments.length);
        } }), ((C.Tween = lt).prototype = { constructor: lt, init: function init(e, t, i, n, o, r) {
            this.elem = e, this.prop = i, this.easing = o || C.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = n, this.unit = r || (C.cssNumber[i] ? "" : "px");
        }, cur: function cur() {
            var e = lt.propHooks[this.prop];return (e && e.get ? e : lt.propHooks._default).get(this);
        }, run: function run(e) {
            var t,
                i = lt.propHooks[this.prop];return this.options.duration ? this.pos = t = C.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), (i && i.set ? i : lt.propHooks._default).set(this), this;
        } }).init.prototype = lt.prototype, (lt.propHooks = { _default: { get: function get(e) {
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (e = C.css(e.elem, e.prop, "")) && "auto" !== e ? e : 0;
            }, set: function set(e) {
                C.fx.step[e.prop] ? C.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !C.cssHooks[e.prop] && null == e.elem.style[et(e.prop)] ? e.elem[e.prop] = e.now : C.style(e.elem, e.prop, e.now + e.unit);
            } } }).scrollTop = lt.propHooks.scrollLeft = { set: function set(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        } }, C.easing = { linear: function linear(e) {
            return e;
        }, swing: function swing(e) {
            return .5 - Math.cos(e * Math.PI) / 2;
        }, _default: "swing" }, C.fx = lt.prototype.init, C.fx.step = {};var ct,
        ut,
        dt = /^(?:toggle|show|hide)$/,
        ht = /queueHooks$/;function ft() {
        ut && (!1 === E.hidden && x.requestAnimationFrame ? x.requestAnimationFrame(ft) : x.setTimeout(ft, C.fx.interval), C.fx.tick());
    }function pt() {
        return x.setTimeout(function () {
            ct = void 0;
        }), ct = Date.now();
    }function mt(e, t) {
        var i,
            n = 0,
            o = { height: e };for (t = t ? 1 : 0; n < 4; n += 2 - t) {
            o["margin" + (i = ie[n])] = o["padding" + i] = e;
        }return t && (o.opacity = o.width = e), o;
    }function gt(e, t, i) {
        for (var n, o = (vt.tweeners[t] || []).concat(vt.tweeners["*"]), r = 0, s = o.length; r < s; r++) {
            if (n = o[r].call(i, t, e)) return n;
        }
    }function vt(o, e, t) {
        var i,
            r,
            n = 0,
            s = vt.prefilters.length,
            a = C.Deferred().always(function () {
            delete l.elem;
        }),
            l = function l() {
            if (r) return !1;for (var e = ct || pt(), e = Math.max(0, c.startTime + c.duration - e), t = 1 - (e / c.duration || 0), i = 0, n = c.tweens.length; i < n; i++) {
                c.tweens[i].run(t);
            }return a.notifyWith(o, [c, t, e]), t < 1 && n ? e : (n || a.notifyWith(o, [c, 1, 0]), a.resolveWith(o, [c]), !1);
        },
            c = a.promise({ elem: o, props: C.extend({}, e), opts: C.extend(!0, { specialEasing: {}, easing: C.easing._default }, t), originalProperties: e, originalOptions: t, startTime: ct || pt(), duration: t.duration, tweens: [], createTween: function createTween(e, t) {
                e = C.Tween(o, c.opts, e, t, c.opts.specialEasing[e] || c.opts.easing);return c.tweens.push(e), e;
            }, stop: function stop(e) {
                var t = 0,
                    i = e ? c.tweens.length : 0;if (r) return this;for (r = !0; t < i; t++) {
                    c.tweens[t].run(1);
                }return e ? (a.notifyWith(o, [c, 1, 0]), a.resolveWith(o, [c, e])) : a.rejectWith(o, [c, e]), this;
            } }),
            u = c.props;for (!function (e, t) {
            var i, n, o, r, s;for (i in e) {
                if (o = t[n = V(i)], r = e[i], Array.isArray(r) && (o = r[1], r = e[i] = r[0]), i !== n && (e[n] = r, delete e[i]), (s = C.cssHooks[n]) && ("expand" in s)) for (i in r = s.expand(r), delete e[n], r) {
                    (i in e) || (e[i] = r[i], t[i] = o);
                } else t[n] = o;
            }
        }(u, c.opts.specialEasing); n < s; n++) {
            if (i = vt.prefilters[n].call(c, o, u, c.opts)) return m(i.stop) && (C._queueHooks(c.elem, c.opts.queue).stop = i.stop.bind(i)), i;
        }return C.map(u, gt, c), m(c.opts.start) && c.opts.start.call(o, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), C.fx.timer(C.extend(l, { elem: o, anim: c, queue: c.opts.queue })), c;
    }C.Animation = C.extend(vt, { tweeners: { "*": [function (e, t) {
                var i = this.createTween(e, t);return ae(i.elem, e, te.exec(t), i), i;
            }] }, tweener: function tweener(e, t) {
            for (var i, n = 0, o = (e = m(e) ? (t = e, ["*"]) : e.match(O)).length; n < o; n++) {
                i = e[n], vt.tweeners[i] = vt.tweeners[i] || [], vt.tweeners[i].unshift(t);
            }
        }, prefilters: [function (e, t, i) {
            var n,
                o,
                r,
                s,
                a,
                l,
                c,
                u = "width" in t || "height" in t,
                d = this,
                h = {},
                f = e.style,
                p = e.nodeType && se(e),
                m = Y.get(e, "fxshow");for (n in i.queue || (null == (s = C._queueHooks(e, "fx")).unqueued && (s.unqueued = 0, a = s.empty.fire, s.empty.fire = function () {
                s.unqueued || a();
            }), s.unqueued++, d.always(function () {
                d.always(function () {
                    s.unqueued--, C.queue(e, "fx").length || s.empty.fire();
                });
            })), t) {
                if (o = t[n], dt.test(o)) {
                    if (delete t[n], r = r || "toggle" === o, o === (p ? "hide" : "show")) {
                        if ("show" !== o || !m || void 0 === m[n]) continue;p = !0;
                    }h[n] = m && m[n] || C.style(e, n);
                }
            }if ((l = !C.isEmptyObject(t)) || !C.isEmptyObject(h)) for (n in u && 1 === e.nodeType && (i.overflow = [f.overflow, f.overflowX, f.overflowY], null == (c = m && m.display) && (c = Y.get(e, "display")), "none" === (u = C.css(e, "display")) && (c ? u = c : (ce([e], !0), c = e.style.display || c, u = C.css(e, "display"), ce([e]))), ("inline" === u || "inline-block" === u && null != c) && "none" === C.css(e, "float") && (l || (d.done(function () {
                f.display = c;
            }), null == c && (u = f.display, c = "none" === u ? "" : u)), f.display = "inline-block")), i.overflow && (f.overflow = "hidden", d.always(function () {
                f.overflow = i.overflow[0], f.overflowX = i.overflow[1], f.overflowY = i.overflow[2];
            })), l = !1, h) {
                l || (m ? "hidden" in m && (p = m.hidden) : m = Y.access(e, "fxshow", { display: c }), r && (m.hidden = !p), p && ce([e], !0), d.done(function () {
                    for (n in p || ce([e]), Y.remove(e, "fxshow"), h) {
                        C.style(e, n, h[n]);
                    }
                })), l = gt(p ? m[n] : 0, n, d), n in m || (m[n] = l.start, p && (l.end = l.start, l.start = 0));
            }
        }], prefilter: function prefilter(e, t) {
            t ? vt.prefilters.unshift(e) : vt.prefilters.push(e);
        } }), C.speed = function (e, t, i) {
        var n = e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? C.extend({}, e) : { complete: i || !i && t || m(e) && e, duration: e, easing: i && t || t && !m(t) && t };return C.fx.off ? n.duration = 0 : "number" != typeof n.duration && (n.duration in C.fx.speeds ? n.duration = C.fx.speeds[n.duration] : n.duration = C.fx.speeds._default), null != n.queue && !0 !== n.queue || (n.queue = "fx"), n.old = n.complete, n.complete = function () {
            m(n.old) && n.old.call(this), n.queue && C.dequeue(this, n.queue);
        }, n;
    }, C.fn.extend({ fadeTo: function fadeTo(e, t, i, n) {
            return this.filter(se).css("opacity", 0).show().end().animate({ opacity: t }, e, i, n);
        }, animate: function animate(t, e, i, n) {
            var o = C.isEmptyObject(t),
                r = C.speed(e, i, n),
                n = function n() {
                var e = vt(this, C.extend({}, t), r);(o || Y.get(this, "finish")) && e.stop(!0);
            };return n.finish = n, o || !1 === r.queue ? this.each(n) : this.queue(r.queue, n);
        }, stop: function stop(o, e, r) {
            function s(e) {
                var t = e.stop;delete e.stop, t(r);
            }return "string" != typeof o && (r = e, e = o, o = void 0), e && this.queue(o || "fx", []), this.each(function () {
                var e = !0,
                    t = null != o && o + "queueHooks",
                    i = C.timers,
                    n = Y.get(this);if (t) n[t] && n[t].stop && s(n[t]);else for (t in n) {
                    n[t] && n[t].stop && ht.test(t) && s(n[t]);
                }for (t = i.length; t--;) {
                    i[t].elem !== this || null != o && i[t].queue !== o || (i[t].anim.stop(r), e = !1, i.splice(t, 1));
                }!e && r || C.dequeue(this, o);
            });
        }, finish: function finish(s) {
            return !1 !== s && (s = s || "fx"), this.each(function () {
                var e,
                    t = Y.get(this),
                    i = t[s + "queue"],
                    n = t[s + "queueHooks"],
                    o = C.timers,
                    r = i ? i.length : 0;for (t.finish = !0, C.queue(this, s, []), n && n.stop && n.stop.call(this, !0), e = o.length; e--;) {
                    o[e].elem === this && o[e].queue === s && (o[e].anim.stop(!0), o.splice(e, 1));
                }for (e = 0; e < r; e++) {
                    i[e] && i[e].finish && i[e].finish.call(this);
                }delete t.finish;
            });
        } }), C.each(["toggle", "show", "hide"], function (e, n) {
        var o = C.fn[n];C.fn[n] = function (e, t, i) {
            return null == e || "boolean" == typeof e ? o.apply(this, arguments) : this.animate(mt(n, !0), e, t, i);
        };
    }), C.each({ slideDown: mt("show"), slideUp: mt("hide"), slideToggle: mt("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, n) {
        C.fn[e] = function (e, t, i) {
            return this.animate(n, e, t, i);
        };
    }), C.timers = [], C.fx.tick = function () {
        var e,
            t = 0,
            i = C.timers;for (ct = Date.now(); t < i.length; t++) {
            (e = i[t])() || i[t] !== e || i.splice(t--, 1);
        }i.length || C.fx.stop(), ct = void 0;
    }, C.fx.timer = function (e) {
        C.timers.push(e), C.fx.start();
    }, C.fx.interval = 13, C.fx.start = function () {
        ut || (ut = !0, ft());
    }, C.fx.stop = function () {
        ut = null;
    }, C.fx.speeds = { slow: 600, fast: 200, _default: 400 }, C.fn.delay = function (n, e) {
        return n = C.fx && C.fx.speeds[n] || n, this.queue(e = e || "fx", function (e, t) {
            var i = x.setTimeout(e, n);t.stop = function () {
                x.clearTimeout(i);
            };
        });
    }, d = E.createElement("input"), ee = E.createElement("select").appendChild(E.createElement("option")), d.type = "checkbox", b.checkOn = "" !== d.value, b.optSelected = ee.selected, (d = E.createElement("input")).value = "t", d.type = "radio", b.radioValue = "t" === d.value;var yt,
        bt = C.expr.attrHandle;C.fn.extend({ attr: function attr(e, t) {
            return B(this, C.attr, e, t, 1 < arguments.length);
        }, removeAttr: function removeAttr(e) {
            return this.each(function () {
                C.removeAttr(this, e);
            });
        } }), C.extend({ attr: function attr(e, t, i) {
            var n,
                o,
                r = e.nodeType;if (3 !== r && 8 !== r && 2 !== r) return void 0 === e.getAttribute ? C.prop(e, t, i) : (1 === r && C.isXMLDoc(e) || (o = C.attrHooks[t.toLowerCase()] || (C.expr.match.bool.test(t) ? yt : void 0)), void 0 !== i ? null === i ? void C.removeAttr(e, t) : o && "set" in o && void 0 !== (n = o.set(e, i, t)) ? n : (e.setAttribute(t, i + ""), i) : !(o && "get" in o && null !== (n = o.get(e, t))) && null == (n = C.find.attr(e, t)) ? void 0 : n);
        }, attrHooks: { type: { set: function set(e, t) {
                    if (!b.radioValue && "radio" === t && S(e, "input")) {
                        var i = e.value;return e.setAttribute("type", t), i && (e.value = i), t;
                    }
                } } }, removeAttr: function removeAttr(e, t) {
            var i,
                n = 0,
                o = t && t.match(O);if (o && 1 === e.nodeType) for (; i = o[n++];) {
                e.removeAttribute(i);
            }
        } }), yt = { set: function set(e, t, i) {
            return !1 === t ? C.removeAttr(e, i) : e.setAttribute(i, i), i;
        } }, C.each(C.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var s = bt[t] || C.find.attr;bt[t] = function (e, t, i) {
            var n,
                o,
                r = t.toLowerCase();return i || (o = bt[r], bt[r] = n, n = null != s(e, t, i) ? r : null, bt[r] = o), n;
        };
    });var _t = /^(?:input|select|textarea|button)$/i,
        wt = /^(?:a|area)$/i;function xt(e) {
        return (e.match(O) || []).join(" ");
    }function Et(e) {
        return e.getAttribute && e.getAttribute("class") || "";
    }function Ct(e) {
        return Array.isArray(e) ? e : "string" == typeof e && e.match(O) || [];
    }C.fn.extend({ prop: function prop(e, t) {
            return B(this, C.prop, e, t, 1 < arguments.length);
        }, removeProp: function removeProp(e) {
            return this.each(function () {
                delete this[C.propFix[e] || e];
            });
        } }), C.extend({ prop: function prop(e, t, i) {
            var n,
                o,
                r = e.nodeType;if (3 !== r && 8 !== r && 2 !== r) return 1 === r && C.isXMLDoc(e) || (t = C.propFix[t] || t, o = C.propHooks[t]), void 0 !== i ? o && "set" in o && void 0 !== (n = o.set(e, i, t)) ? n : e[t] = i : o && "get" in o && null !== (n = o.get(e, t)) ? n : e[t];
        }, propHooks: { tabIndex: { get: function get(e) {
                    var t = C.find.attr(e, "tabindex");return t ? parseInt(t, 10) : _t.test(e.nodeName) || wt.test(e.nodeName) && e.href ? 0 : -1;
                } } }, propFix: { for: "htmlFor", class: "className" } }), b.optSelected || (C.propHooks.selected = { get: function get(e) {
            e = e.parentNode;return e && e.parentNode && e.parentNode.selectedIndex, null;
        }, set: function set(e) {
            e = e.parentNode;e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex);
        } }), C.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        C.propFix[this.toLowerCase()] = this;
    }), C.fn.extend({ addClass: function addClass(t) {
            var e,
                i,
                n,
                o,
                r,
                s,
                a = 0;if (m(t)) return this.each(function (e) {
                C(this).addClass(t.call(this, e, Et(this)));
            });if ((e = Ct(t)).length) for (; i = this[a++];) {
                if (s = Et(i), n = 1 === i.nodeType && " " + xt(s) + " ") {
                    for (r = 0; o = e[r++];) {
                        n.indexOf(" " + o + " ") < 0 && (n += o + " ");
                    }s !== (s = xt(n)) && i.setAttribute("class", s);
                }
            }return this;
        }, removeClass: function removeClass(t) {
            var e,
                i,
                n,
                o,
                r,
                s,
                a = 0;if (m(t)) return this.each(function (e) {
                C(this).removeClass(t.call(this, e, Et(this)));
            });if (!arguments.length) return this.attr("class", "");if ((e = Ct(t)).length) for (; i = this[a++];) {
                if (s = Et(i), n = 1 === i.nodeType && " " + xt(s) + " ") {
                    for (r = 0; o = e[r++];) {
                        for (; -1 < n.indexOf(" " + o + " ");) {
                            n = n.replace(" " + o + " ", " ");
                        }
                    }s !== (s = xt(n)) && i.setAttribute("class", s);
                }
            }return this;
        }, toggleClass: function toggleClass(o, t) {
            var r = typeof o === "undefined" ? "undefined" : _typeof(o),
                s = "string" == r || Array.isArray(o);return "boolean" == typeof t && s ? t ? this.addClass(o) : this.removeClass(o) : m(o) ? this.each(function (e) {
                C(this).toggleClass(o.call(this, e, Et(this), t), t);
            }) : this.each(function () {
                var e, t, i, n;if (s) for (t = 0, i = C(this), n = Ct(o); e = n[t++];) {
                    i.hasClass(e) ? i.removeClass(e) : i.addClass(e);
                } else void 0 !== o && "boolean" != r || ((e = Et(this)) && Y.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", !e && !1 !== o && Y.get(this, "__className__") || ""));
            });
        }, hasClass: function hasClass(e) {
            for (var t, i = 0, n = " " + e + " "; t = this[i++];) {
                if (1 === t.nodeType && -1 < (" " + xt(Et(t)) + " ").indexOf(n)) return !0;
            }return !1;
        } });var kt = /\r/g;C.fn.extend({ val: function val(t) {
            var i,
                e,
                n,
                o = this[0];return arguments.length ? (n = m(t), this.each(function (e) {
                1 === this.nodeType && (null == (e = n ? t.call(this, e, C(this).val()) : t) ? e = "" : "number" == typeof e ? e += "" : Array.isArray(e) && (e = C.map(e, function (e) {
                    return null == e ? "" : e + "";
                })), (i = C.valHooks[this.type] || C.valHooks[this.nodeName.toLowerCase()]) && "set" in i && void 0 !== i.set(this, e, "value") || (this.value = e));
            })) : o ? (i = C.valHooks[o.type] || C.valHooks[o.nodeName.toLowerCase()]) && "get" in i && void 0 !== (e = i.get(o, "value")) ? e : "string" == typeof (e = o.value) ? e.replace(kt, "") : null == e ? "" : e : void 0;
        } }), C.extend({ valHooks: { option: { get: function get(e) {
                    var t = C.find.attr(e, "value");return null != t ? t : xt(C.text(e));
                } }, select: { get: function get(e) {
                    for (var t, i = e.options, n = e.selectedIndex, o = "select-one" === e.type, r = o ? null : [], s = o ? n + 1 : i.length, a = n < 0 ? s : o ? n : 0; a < s; a++) {
                        if (((t = i[a]).selected || a === n) && !t.disabled && (!t.parentNode.disabled || !S(t.parentNode, "optgroup"))) {
                            if (t = C(t).val(), o) return t;r.push(t);
                        }
                    }return r;
                }, set: function set(e, t) {
                    for (var i, n, o = e.options, r = C.makeArray(t), s = o.length; s--;) {
                        ((n = o[s]).selected = -1 < C.inArray(C.valHooks.option.get(n), r)) && (i = !0);
                    }return i || (e.selectedIndex = -1), r;
                } } } }), C.each(["radio", "checkbox"], function () {
        C.valHooks[this] = { set: function set(e, t) {
                if (Array.isArray(t)) return e.checked = -1 < C.inArray(C(e).val(), t);
            } }, b.checkOn || (C.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value;
        });
    }), b.focusin = "onfocusin" in x;function Tt(e) {
        e.stopPropagation();
    }var St = /^(?:focusinfocus|focusoutblur)$/;C.extend(C.event, { trigger: function trigger(e, t, i, n) {
            var o,
                r,
                s,
                a,
                l,
                c,
                u,
                d = [i || E],
                h = y.call(e, "type") ? e.type : e,
                f = y.call(e, "namespace") ? e.namespace.split(".") : [],
                p = u = r = i = i || E;if (3 !== i.nodeType && 8 !== i.nodeType && !St.test(h + C.event.triggered) && (-1 < h.indexOf(".") && (h = (f = h.split(".")).shift(), f.sort()), a = h.indexOf(":") < 0 && "on" + h, (e = e[C.expando] ? e : new C.Event(h, "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e)).isTrigger = n ? 2 : 3, e.namespace = f.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = i), t = null == t ? [e] : C.makeArray(t, [e]), c = C.event.special[h] || {}, n || !c.trigger || !1 !== c.trigger.apply(i, t))) {
                if (!n && !c.noBubble && !g(i)) {
                    for (s = c.delegateType || h, St.test(s + h) || (p = p.parentNode); p; p = p.parentNode) {
                        d.push(p), r = p;
                    }r === (i.ownerDocument || E) && d.push(r.defaultView || r.parentWindow || x);
                }for (o = 0; (p = d[o++]) && !e.isPropagationStopped();) {
                    u = p, e.type = 1 < o ? s : c.bindType || h, (l = (Y.get(p, "events") || Object.create(null))[e.type] && Y.get(p, "handle")) && l.apply(p, t), (l = a && p[a]) && l.apply && Q(p) && (e.result = l.apply(p, t), !1 === e.result && e.preventDefault());
                }return e.type = h, n || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(d.pop(), t) || !Q(i) || a && m(i[h]) && !g(i) && ((r = i[a]) && (i[a] = null), C.event.triggered = h, e.isPropagationStopped() && u.addEventListener(h, Tt), i[h](), e.isPropagationStopped() && u.removeEventListener(h, Tt), C.event.triggered = void 0, r && (i[a] = r)), e.result;
            }
        }, simulate: function simulate(e, t, i) {
            e = C.extend(new C.Event(), i, { type: e, isSimulated: !0 });C.event.trigger(e, null, t);
        } }), C.fn.extend({ trigger: function trigger(e, t) {
            return this.each(function () {
                C.event.trigger(e, t, this);
            });
        }, triggerHandler: function triggerHandler(e, t) {
            var i = this[0];if (i) return C.event.trigger(e, t, i, !0);
        } }), b.focusin || C.each({ focus: "focusin", blur: "focusout" }, function (i, n) {
        function o(e) {
            C.event.simulate(n, e.target, C.event.fix(e));
        }C.event.special[n] = { setup: function setup() {
                var e = this.ownerDocument || this.document || this,
                    t = Y.access(e, n);t || e.addEventListener(i, o, !0), Y.access(e, n, (t || 0) + 1);
            }, teardown: function teardown() {
                var e = this.ownerDocument || this.document || this,
                    t = Y.access(e, n) - 1;t ? Y.access(e, n, t) : (e.removeEventListener(i, o, !0), Y.remove(e, n));
            } };
    });var Dt = x.location,
        At = { guid: Date.now() },
        Lt = /\?/;C.parseXML = function (e) {
        var t;if (!e || "string" != typeof e) return null;try {
            t = new x.DOMParser().parseFromString(e, "text/xml");
        } catch (e) {
            t = void 0;
        }return t && !t.getElementsByTagName("parsererror").length || C.error("Invalid XML: " + e), t;
    };var Nt = /\[\]$/,
        It = /\r?\n/g,
        Pt = /^(?:submit|button|image|reset|file)$/i,
        jt = /^(?:input|select|textarea|keygen)/i;C.param = function (e, t) {
        function i(e, t) {
            t = m(t) ? t() : t, o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == t ? "" : t);
        }var n,
            o = [];if (null == e) return "";if (Array.isArray(e) || e.jquery && !C.isPlainObject(e)) C.each(e, function () {
            i(this.name, this.value);
        });else for (n in e) {
            !function i(n, e, o, r) {
                if (Array.isArray(e)) C.each(e, function (e, t) {
                    o || Nt.test(n) ? r(n, t) : i(n + "[" + ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && null != t ? e : "") + "]", t, o, r);
                });else if (o || "object" !== p(e)) r(n, e);else for (var t in e) {
                    i(n + "[" + t + "]", e[t], o, r);
                }
            }(n, e[n], t, i);
        }return o.join("&");
    }, C.fn.extend({ serialize: function serialize() {
            return C.param(this.serializeArray());
        }, serializeArray: function serializeArray() {
            return this.map(function () {
                var e = C.prop(this, "elements");return e ? C.makeArray(e) : this;
            }).filter(function () {
                var e = this.type;return this.name && !C(this).is(":disabled") && jt.test(this.nodeName) && !Pt.test(e) && (this.checked || !ue.test(e));
            }).map(function (e, t) {
                var i = C(this).val();return null == i ? null : Array.isArray(i) ? C.map(i, function (e) {
                    return { name: t.name, value: e.replace(It, "\r\n") };
                }) : { name: t.name, value: i.replace(It, "\r\n") };
            }).get();
        } });var Ot = /%20/g,
        Rt = /#.*$/,
        qt = /([?&])_=[^&]*/,
        Ft = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Mt = /^(?:GET|HEAD)$/,
        Ht = /^\/\//,
        zt = {},
        Bt = {},
        Wt = "*/".concat("*"),
        Ut = E.createElement("a");function $t(r) {
        return function (e, t) {
            "string" != typeof e && (t = e, e = "*");var i,
                n = 0,
                o = e.toLowerCase().match(O) || [];if (m(t)) for (; i = o[n++];) {
                "+" === i[0] ? (i = i.slice(1) || "*", (r[i] = r[i] || []).unshift(t)) : (r[i] = r[i] || []).push(t);
            }
        };
    }function Vt(t, n, o, r) {
        var s = {},
            a = t === Bt;function l(e) {
            var i;return s[e] = !0, C.each(t[e] || [], function (e, t) {
                t = t(n, o, r);return "string" != typeof t || a || s[t] ? a ? !(i = t) : void 0 : (n.dataTypes.unshift(t), l(t), !1);
            }), i;
        }return l(n.dataTypes[0]) || !s["*"] && l("*");
    }function Qt(e, t) {
        var i,
            n,
            o = C.ajaxSettings.flatOptions || {};for (i in t) {
            void 0 !== t[i] && ((o[i] ? e : n = n || {})[i] = t[i]);
        }return n && C.extend(!0, e, n), e;
    }Ut.href = Dt.href, C.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: Dt.href, type: "GET", isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Dt.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Wt, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": C.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function ajaxSetup(e, t) {
            return t ? Qt(Qt(e, C.ajaxSettings), t) : Qt(C.ajaxSettings, e);
        }, ajaxPrefilter: $t(zt), ajaxTransport: $t(Bt), ajax: function ajax(e, t) {
            "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && (t = e, e = void 0);var l,
                c,
                u,
                i,
                d,
                h,
                f,
                n,
                o,
                p = C.ajaxSetup({}, t = t || {}),
                m = p.context || p,
                g = p.context && (m.nodeType || m.jquery) ? C(m) : C.event,
                v = C.Deferred(),
                y = C.Callbacks("once memory"),
                b = p.statusCode || {},
                r = {},
                s = {},
                a = "canceled",
                _ = { readyState: 0, getResponseHeader: function getResponseHeader(e) {
                    var t;if (h) {
                        if (!i) for (i = {}; t = Ft.exec(u);) {
                            i[t[1].toLowerCase() + " "] = (i[t[1].toLowerCase() + " "] || []).concat(t[2]);
                        }t = i[e.toLowerCase() + " "];
                    }return null == t ? null : t.join(", ");
                }, getAllResponseHeaders: function getAllResponseHeaders() {
                    return h ? u : null;
                }, setRequestHeader: function setRequestHeader(e, t) {
                    return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e, r[e] = t), this;
                }, overrideMimeType: function overrideMimeType(e) {
                    return null == h && (p.mimeType = e), this;
                }, statusCode: function statusCode(e) {
                    if (e) if (h) _.always(e[_.status]);else for (var t in e) {
                        b[t] = [b[t], e[t]];
                    }return this;
                }, abort: function abort(e) {
                    e = e || a;return l && l.abort(e), w(0, e), this;
                } };if (v.promise(_), p.url = ((e || p.url || Dt.href) + "").replace(Ht, Dt.protocol + "//"), p.type = t.method || t.type || p.method || p.type, p.dataTypes = (p.dataType || "*").toLowerCase().match(O) || [""], null == p.crossDomain) {
                o = E.createElement("a");try {
                    o.href = p.url, o.href = o.href, p.crossDomain = Ut.protocol + "//" + Ut.host != o.protocol + "//" + o.host;
                } catch (e) {
                    p.crossDomain = !0;
                }
            }if (p.data && p.processData && "string" != typeof p.data && (p.data = C.param(p.data, p.traditional)), Vt(zt, p, t, _), h) return _;for (n in (f = C.event && p.global) && 0 == C.active++ && C.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Mt.test(p.type), c = p.url.replace(Rt, ""), p.hasContent ? p.data && p.processData && 0 === (p.contentType || "").indexOf("application/x-www-form-urlencoded") && (p.data = p.data.replace(Ot, "+")) : (o = p.url.slice(c.length), p.data && (p.processData || "string" == typeof p.data) && (c += (Lt.test(c) ? "&" : "?") + p.data, delete p.data), !1 === p.cache && (c = c.replace(qt, "$1"), o = (Lt.test(c) ? "&" : "?") + "_=" + At.guid++ + o), p.url = c + o), p.ifModified && (C.lastModified[c] && _.setRequestHeader("If-Modified-Since", C.lastModified[c]), C.etag[c] && _.setRequestHeader("If-None-Match", C.etag[c])), (p.data && p.hasContent && !1 !== p.contentType || t.contentType) && _.setRequestHeader("Content-Type", p.contentType), _.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Wt + "; q=0.01" : "") : p.accepts["*"]), p.headers) {
                _.setRequestHeader(n, p.headers[n]);
            }if (p.beforeSend && (!1 === p.beforeSend.call(m, _, p) || h)) return _.abort();if (a = "abort", y.add(p.complete), _.done(p.success), _.fail(p.error), l = Vt(Bt, p, t, _)) {
                if (_.readyState = 1, f && g.trigger("ajaxSend", [_, p]), h) return _;p.async && 0 < p.timeout && (d = x.setTimeout(function () {
                    _.abort("timeout");
                }, p.timeout));try {
                    h = !1, l.send(r, w);
                } catch (e) {
                    if (h) throw e;w(-1, e);
                }
            } else w(-1, "No Transport");function w(e, t, i, n) {
                var o,
                    r,
                    s,
                    a = t;h || (h = !0, d && x.clearTimeout(d), l = void 0, u = n || "", _.readyState = 0 < e ? 4 : 0, n = 200 <= e && e < 300 || 304 === e, i && (s = function (e, t, i) {
                    for (var n, o, r, s, a = e.contents, l = e.dataTypes; "*" === l[0];) {
                        l.shift(), void 0 === n && (n = e.mimeType || t.getResponseHeader("Content-Type"));
                    }if (n) for (o in a) {
                        if (a[o] && a[o].test(n)) {
                            l.unshift(o);break;
                        }
                    }if (l[0] in i) r = l[0];else {
                        for (o in i) {
                            if (!l[0] || e.converters[o + " " + l[0]]) {
                                r = o;break;
                            }s = s || o;
                        }r = r || s;
                    }if (r) return r !== l[0] && l.unshift(r), i[r];
                }(p, _, i)), !n && -1 < C.inArray("script", p.dataTypes) && (p.converters["text script"] = function () {}), s = function (e, t, i, n) {
                    var o,
                        r,
                        s,
                        a,
                        l,
                        c = {},
                        u = e.dataTypes.slice();if (u[1]) for (s in e.converters) {
                        c[s.toLowerCase()] = e.converters[s];
                    }for (r = u.shift(); r;) {
                        if (e.responseFields[r] && (i[e.responseFields[r]] = t), !l && n && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = u.shift()) if ("*" === r) r = l;else if ("*" !== l && l !== r) {
                            if (!(s = c[l + " " + r] || c["* " + r])) for (o in c) {
                                if ((a = o.split(" "))[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                                    !0 === s ? s = c[o] : !0 !== c[o] && (r = a[0], u.unshift(a[1]));break;
                                }
                            }if (!0 !== s) if (s && e.throws) t = s(t);else try {
                                t = s(t);
                            } catch (e) {
                                return { state: "parsererror", error: s ? e : "No conversion from " + l + " to " + r };
                            }
                        }
                    }return { state: "success", data: t };
                }(p, s, _, n), n ? (p.ifModified && ((i = _.getResponseHeader("Last-Modified")) && (C.lastModified[c] = i), (i = _.getResponseHeader("etag")) && (C.etag[c] = i)), 204 === e || "HEAD" === p.type ? a = "nocontent" : 304 === e ? a = "notmodified" : (a = s.state, o = s.data, n = !(r = s.error))) : (r = a, !e && a || (a = "error", e < 0 && (e = 0))), _.status = e, _.statusText = (t || a) + "", n ? v.resolveWith(m, [o, a, _]) : v.rejectWith(m, [_, a, r]), _.statusCode(b), b = void 0, f && g.trigger(n ? "ajaxSuccess" : "ajaxError", [_, p, n ? o : r]), y.fireWith(m, [_, a]), f && (g.trigger("ajaxComplete", [_, p]), --C.active || C.event.trigger("ajaxStop")));
            }return _;
        }, getJSON: function getJSON(e, t, i) {
            return C.get(e, t, i, "json");
        }, getScript: function getScript(e, t) {
            return C.get(e, void 0, t, "script");
        } }), C.each(["get", "post"], function (e, o) {
        C[o] = function (e, t, i, n) {
            return m(t) && (n = n || i, i = t, t = void 0), C.ajax(C.extend({ url: e, type: o, dataType: n, data: t, success: i }, C.isPlainObject(e) && e));
        };
    }), C.ajaxPrefilter(function (e) {
        for (var t in e.headers) {
            "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "");
        }
    }), C._evalUrl = function (e, t, i) {
        return C.ajax({ url: e, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, converters: { "text script": function textScript() {} }, dataFilter: function dataFilter(e) {
                C.globalEval(e, t, i);
            } });
    }, C.fn.extend({ wrapAll: function wrapAll(e) {
            return this[0] && (m(e) && (e = e.call(this[0])), e = C(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
                for (var e = this; e.firstElementChild;) {
                    e = e.firstElementChild;
                }return e;
            }).append(this)), this;
        }, wrapInner: function wrapInner(i) {
            return m(i) ? this.each(function (e) {
                C(this).wrapInner(i.call(this, e));
            }) : this.each(function () {
                var e = C(this),
                    t = e.contents();t.length ? t.wrapAll(i) : e.append(i);
            });
        }, wrap: function wrap(t) {
            var i = m(t);return this.each(function (e) {
                C(this).wrapAll(i ? t.call(this, e) : t);
            });
        }, unwrap: function unwrap(e) {
            return this.parent(e).not("body").each(function () {
                C(this).replaceWith(this.childNodes);
            }), this;
        } }), C.expr.pseudos.hidden = function (e) {
        return !C.expr.pseudos.visible(e);
    }, C.expr.pseudos.visible = function (e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    }, C.ajaxSettings.xhr = function () {
        try {
            return new x.XMLHttpRequest();
        } catch (e) {}
    };var Xt = { 0: 200, 1223: 204 },
        Yt = C.ajaxSettings.xhr();b.cors = !!Yt && "withCredentials" in Yt, b.ajax = Yt = !!Yt, C.ajaxTransport(function (o) {
        var _r, s;if (b.cors || Yt && !o.crossDomain) return { send: function send(e, t) {
                var i,
                    n = o.xhr();if (n.open(o.type, o.url, o.async, o.username, o.password), o.xhrFields) for (i in o.xhrFields) {
                    n[i] = o.xhrFields[i];
                }for (i in o.mimeType && n.overrideMimeType && n.overrideMimeType(o.mimeType), o.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) {
                    n.setRequestHeader(i, e[i]);
                }_r = function r(e) {
                    return function () {
                        _r && (_r = s = n.onload = n.onerror = n.onabort = n.ontimeout = n.onreadystatechange = null, "abort" === e ? n.abort() : "error" === e ? "number" != typeof n.status ? t(0, "error") : t(n.status, n.statusText) : t(Xt[n.status] || n.status, n.statusText, "text" !== (n.responseType || "text") || "string" != typeof n.responseText ? { binary: n.response } : { text: n.responseText }, n.getAllResponseHeaders()));
                    };
                }, n.onload = _r(), s = n.onerror = n.ontimeout = _r("error"), void 0 !== n.onabort ? n.onabort = s : n.onreadystatechange = function () {
                    4 === n.readyState && x.setTimeout(function () {
                        _r && s();
                    });
                }, _r = _r("abort");try {
                    n.send(o.hasContent && o.data || null);
                } catch (e) {
                    if (_r) throw e;
                }
            }, abort: function abort() {
                _r && _r();
            } };
    }), C.ajaxPrefilter(function (e) {
        e.crossDomain && (e.contents.script = !1);
    }), C.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function textScript(e) {
                return C.globalEval(e), e;
            } } }), C.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
    }), C.ajaxTransport("script", function (i) {
        var n, _o;if (i.crossDomain || i.scriptAttrs) return { send: function send(e, t) {
                n = C("<script>").attr(i.scriptAttrs || {}).prop({ charset: i.scriptCharset, src: i.url }).on("load error", _o = function o(e) {
                    n.remove(), _o = null, e && t("error" === e.type ? 404 : 200, e.type);
                }), E.head.appendChild(n[0]);
            }, abort: function abort() {
                _o && _o();
            } };
    });var Kt = [],
        Gt = /(=)\?(?=&|$)|\?\?/;C.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
            var e = Kt.pop() || C.expando + "_" + At.guid++;return this[e] = !0, e;
        } }), C.ajaxPrefilter("json jsonp", function (e, t, i) {
        var n,
            o,
            r,
            s = !1 !== e.jsonp && (Gt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Gt.test(e.data) && "data");if (s || "jsonp" === e.dataTypes[0]) return n = e.jsonpCallback = m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(Gt, "$1" + n) : !1 !== e.jsonp && (e.url += (Lt.test(e.url) ? "&" : "?") + e.jsonp + "=" + n), e.converters["script json"] = function () {
            return r || C.error(n + " was not called"), r[0];
        }, e.dataTypes[0] = "json", o = x[n], x[n] = function () {
            r = arguments;
        }, i.always(function () {
            void 0 === o ? C(x).removeProp(n) : x[n] = o, e[n] && (e.jsonpCallback = t.jsonpCallback, Kt.push(n)), r && m(o) && o(r[0]), r = o = void 0;
        }), "script";
    }), b.createHTMLDocument = ((d = E.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === d.childNodes.length), C.parseHTML = function (e, t, i) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (i = t, t = !1), t || (b.createHTMLDocument ? ((n = (t = E.implementation.createHTMLDocument("")).createElement("base")).href = E.location.href, t.head.appendChild(n)) : t = E), n = !i && [], (i = D.exec(e)) ? [t.createElement(i[1])] : (i = ve([e], t, n), n && n.length && C(n).remove(), C.merge([], i.childNodes)));var n;
    }, C.fn.load = function (e, t, i) {
        var n,
            o,
            r,
            s = this,
            a = e.indexOf(" ");return -1 < a && (n = xt(e.slice(a)), e = e.slice(0, a)), m(t) ? (i = t, t = void 0) : t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (o = "POST"), 0 < s.length && C.ajax({ url: e, type: o || "GET", dataType: "html", data: t }).done(function (e) {
            r = arguments, s.html(n ? C("<div>").append(C.parseHTML(e)).find(n) : e);
        }).always(i && function (e, t) {
            s.each(function () {
                i.apply(this, r || [e.responseText, t, e]);
            });
        }), this;
    }, C.expr.pseudos.animated = function (t) {
        return C.grep(C.timers, function (e) {
            return t === e.elem;
        }).length;
    }, C.offset = { setOffset: function setOffset(e, t, i) {
            var n,
                o,
                r,
                s,
                a = C.css(e, "position"),
                l = C(e),
                c = {};"static" === a && (e.style.position = "relative"), r = l.offset(), n = C.css(e, "top"), s = C.css(e, "left"), s = ("absolute" === a || "fixed" === a) && -1 < (n + s).indexOf("auto") ? (o = (a = l.position()).top, a.left) : (o = parseFloat(n) || 0, parseFloat(s) || 0), null != (t = m(t) ? t.call(e, i, C.extend({}, r)) : t).top && (c.top = t.top - r.top + o), null != t.left && (c.left = t.left - r.left + s), "using" in t ? t.using.call(e, c) : ("number" == typeof c.top && (c.top += "px"), "number" == typeof c.left && (c.left += "px"), l.css(c));
        } }, C.fn.extend({ offset: function offset(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function (e) {
                C.offset.setOffset(this, t, e);
            });var e,
                i = this[0];return i ? i.getClientRects().length ? (e = i.getBoundingClientRect(), i = i.ownerDocument.defaultView, { top: e.top + i.pageYOffset, left: e.left + i.pageXOffset }) : { top: 0, left: 0 } : void 0;
        }, position: function position() {
            if (this[0]) {
                var e,
                    t,
                    i,
                    n = this[0],
                    o = { top: 0, left: 0 };if ("fixed" === C.css(n, "position")) t = n.getBoundingClientRect();else {
                    for (t = this.offset(), i = n.ownerDocument, e = n.offsetParent || i.documentElement; e && (e === i.body || e === i.documentElement) && "static" === C.css(e, "position");) {
                        e = e.parentNode;
                    }e && e !== n && 1 === e.nodeType && ((o = C(e).offset()).top += C.css(e, "borderTopWidth", !0), o.left += C.css(e, "borderLeftWidth", !0));
                }return { top: t.top - o.top - C.css(n, "marginTop", !0), left: t.left - o.left - C.css(n, "marginLeft", !0) };
            }
        }, offsetParent: function offsetParent() {
            return this.map(function () {
                for (var e = this.offsetParent; e && "static" === C.css(e, "position");) {
                    e = e.offsetParent;
                }return e || ne;
            });
        } }), C.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (t, o) {
        var r = "pageYOffset" === o;C.fn[t] = function (e) {
            return B(this, function (e, t, i) {
                var n;return g(e) ? n = e : 9 === e.nodeType && (n = e.defaultView), void 0 === i ? n ? n[o] : e[t] : void (n ? n.scrollTo(r ? n.pageXOffset : i, r ? i : n.pageYOffset) : e[t] = i);
            }, t, e, arguments.length);
        };
    }), C.each(["top", "left"], function (e, i) {
        C.cssHooks[i] = Ke(b.pixelPosition, function (e, t) {
            if (t) return t = Ye(e, i), $e.test(t) ? C(e).position()[i] + "px" : t;
        });
    }), C.each({ Height: "height", Width: "width" }, function (s, a) {
        C.each({ padding: "inner" + s, content: a, "": "outer" + s }, function (n, r) {
            C.fn[r] = function (e, t) {
                var i = arguments.length && (n || "boolean" != typeof e),
                    o = n || (!0 === e || !0 === t ? "margin" : "border");return B(this, function (e, t, i) {
                    var n;return g(e) ? 0 === r.indexOf("outer") ? e["inner" + s] : e.document.documentElement["client" + s] : 9 === e.nodeType ? (n = e.documentElement, Math.max(e.body["scroll" + s], n["scroll" + s], e.body["offset" + s], n["offset" + s], n["client" + s])) : void 0 === i ? C.css(e, t, o) : C.style(e, t, i, o);
                }, a, i ? e : void 0, i);
            };
        });
    }), C.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        C.fn[t] = function (e) {
            return this.on(t, e);
        };
    }), C.fn.extend({ bind: function bind(e, t, i) {
            return this.on(e, null, t, i);
        }, unbind: function unbind(e, t) {
            return this.off(e, null, t);
        }, delegate: function delegate(e, t, i, n) {
            return this.on(t, e, i, n);
        }, undelegate: function undelegate(e, t, i) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i);
        }, hover: function hover(e, t) {
            return this.mouseenter(e).mouseleave(t || e);
        } }), C.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, i) {
        C.fn[i] = function (e, t) {
            return 0 < arguments.length ? this.on(i, null, e, t) : this.trigger(i);
        };
    });var Jt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;C.proxy = function (e, t) {
        var i, n;if ("string" == typeof t && (n = e[t], t = e, e = n), m(e)) return i = a.call(arguments, 2), (n = function n() {
            return e.apply(t || this, i.concat(a.call(arguments)));
        }).guid = e.guid = e.guid || C.guid++, n;
    }, C.holdReady = function (e) {
        e ? C.readyWait++ : C.ready(!0);
    }, C.isArray = Array.isArray, C.parseJSON = JSON.parse, C.nodeName = S, C.isFunction = m, C.isWindow = g, C.camelCase = V, C.type = p, C.now = Date.now, C.isNumeric = function (e) {
        var t = C.type(e);return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
    }, C.trim = function (e) {
        return null == e ? "" : (e + "").replace(Jt, "");
    }, "function" == typeof define && define.amd && define("jquery", [], function () {
        return C;
    });var Zt = x.jQuery,
        ei = x.$;return C.noConflict = function (e) {
        return x.$ === C && (x.$ = ei), e && x.jQuery === C && (x.jQuery = Zt), C;
    }, void 0 === e && (x.jQuery = x.$ = C), C;
}), function (e, t) {
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Popper = t();
}(this, function () {
    "use strict";
    var i = "undefined" != typeof window && "undefined" != typeof document && "undefined" != typeof navigator,
        n = function () {
        for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1) {
            if (i && 0 <= navigator.userAgent.indexOf(e[t])) return 1;
        }return 0;
    }();var o = i && window.Promise ? function (e) {
        var t = !1;return function () {
            t || (t = !0, window.Promise.resolve().then(function () {
                t = !1, e();
            }));
        };
    } : function (e) {
        var t = !1;return function () {
            t || (t = !0, setTimeout(function () {
                t = !1, e();
            }, n));
        };
    };function r(e) {
        return e && "[object Function]" === {}.toString.call(e);
    }function d(e, t) {
        if (1 !== e.nodeType) return [];e = e.ownerDocument.defaultView.getComputedStyle(e, null);return t ? e[t] : e;
    }function c(e) {
        return "HTML" === e.nodeName ? e : e.parentNode || e.host;
    }function u(e) {
        if (!e) return document.body;switch (e.nodeName) {case "HTML":case "BODY":
                return e.ownerDocument.body;case "#document":
                return e.body;}var t = d(e),
            i = t.overflow,
            n = t.overflowX,
            t = t.overflowY;return (/(auto|scroll|overlay)/.test(i + t + n) ? e : u(c(e))
        );
    }function h(e) {
        return e && e.referenceNode ? e.referenceNode : e;
    }var t = i && !(!window.MSInputMethodContext || !document.documentMode),
        s = i && /MSIE 10/.test(navigator.userAgent);function f(e) {
        return 11 === e ? t : 10 !== e && t || s;
    }function g(e) {
        if (!e) return document.documentElement;for (var t = f(10) ? document.body : null, i = e.offsetParent || null; i === t && e.nextElementSibling;) {
            i = (e = e.nextElementSibling).offsetParent;
        }var n = i && i.nodeName;return n && "BODY" !== n && "HTML" !== n ? -1 !== ["TH", "TD", "TABLE"].indexOf(i.nodeName) && "static" === d(i, "position") ? g(i) : i : (e ? e.ownerDocument : document).documentElement;
    }function a(e) {
        return null !== e.parentNode ? a(e.parentNode) : e;
    }function p(e, t) {
        if (!(e && e.nodeType && t && t.nodeType)) return document.documentElement;var i = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            n = i ? e : t,
            o = i ? t : e,
            i = document.createRange();i.setStart(n, 0), i.setEnd(o, 0);i = i.commonAncestorContainer;if (e !== i && t !== i || n.contains(o)) return "BODY" === (o = (n = i).nodeName) || "HTML" !== o && g(n.firstElementChild) !== n ? g(i) : i;i = a(e);return i.host ? p(i.host, t) : p(e, a(t).host);
    }function m(e, t) {
        var i = "top" === (1 < arguments.length && void 0 !== t ? t : "top") ? "scrollTop" : "scrollLeft",
            t = e.nodeName;if ("BODY" !== t && "HTML" !== t) return e[i];t = e.ownerDocument.documentElement;return (e.ownerDocument.scrollingElement || t)[i];
    }function l(e, t) {
        var i = "x" === t ? "Left" : "Top",
            t = "Left" == i ? "Right" : "Bottom";return parseFloat(e["border" + i + "Width"]) + parseFloat(e["border" + t + "Width"]);
    }function v(e, t, i, n) {
        return Math.max(t["offset" + e], t["scroll" + e], i["client" + e], i["offset" + e], i["scroll" + e], f(10) ? parseInt(i["offset" + e]) + parseInt(n["margin" + ("Height" === e ? "Top" : "Left")]) + parseInt(n["margin" + ("Height" === e ? "Bottom" : "Right")]) : 0);
    }function y(e) {
        var t = e.body,
            i = e.documentElement,
            e = f(10) && getComputedStyle(i);return { height: v("Height", t, i, e), width: v("Width", t, i, e) };
    }var e = function e(_e2, t, i) {
        return t && b(_e2.prototype, t), i && b(_e2, i), _e2;
    };function b(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
    }function _(e, t, i) {
        return t in e ? Object.defineProperty(e, t, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = i, e;
    }var w = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var i,
                n = arguments[t];for (i in n) {
                Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
            }
        }return e;
    };function x(e) {
        return w({}, e, { right: e.left + e.width, bottom: e.top + e.height });
    }function E(e) {
        var t = {};try {
            f(10) ? (t = e.getBoundingClientRect(), i = m(e, "top"), n = m(e, "left"), t.top += i, t.left += n, t.bottom += i, t.right += n) : t = e.getBoundingClientRect();
        } catch (e) {}var i = { left: t.left, top: t.top, width: t.right - t.left, height: t.bottom - t.top },
            n = "HTML" === e.nodeName ? y(e.ownerDocument) : {},
            t = n.width || e.clientWidth || i.width,
            n = n.height || e.clientHeight || i.height,
            t = e.offsetWidth - t,
            n = e.offsetHeight - n;return (t || n) && (t -= l(e = d(e), "x"), n -= l(e, "y"), i.width -= t, i.height -= n), x(i);
    }function C(e, t, i) {
        var n = 2 < arguments.length && void 0 !== i && i,
            o = f(10),
            r = "HTML" === t.nodeName,
            s = E(e),
            a = E(t),
            l = u(e),
            c = d(t),
            i = parseFloat(c.borderTopWidth),
            e = parseFloat(c.borderLeftWidth);n && r && (a.top = Math.max(a.top, 0), a.left = Math.max(a.left, 0));s = x({ top: s.top - a.top - i, left: s.left - a.left - e, width: s.width, height: s.height });return s.marginTop = 0, s.marginLeft = 0, !o && r && (r = parseFloat(c.marginTop), c = parseFloat(c.marginLeft), s.top -= i - r, s.bottom -= i - r, s.left -= e - c, s.right -= e - c, s.marginTop = r, s.marginLeft = c), s = (o && !n ? t.contains(l) : t === l && "BODY" !== l.nodeName) ? function (e, t, i) {
            var n = 2 < arguments.length && void 0 !== i && i,
                i = m(t, "top"),
                t = m(t, "left"),
                n = n ? -1 : 1;return e.top += i * n, e.bottom += i * n, e.left += t * n, e.right += t * n, e;
        }(s, t) : s;
    }function k(e) {
        if (!e || !e.parentElement || f()) return document.documentElement;for (var t = e.parentElement; t && "none" === d(t, "transform");) {
            t = t.parentElement;
        }return t || document.documentElement;
    }function T(e, t, i, n, o) {
        var r = 4 < arguments.length && void 0 !== o && o,
            s = { top: 0, left: 0 },
            a = r ? k(e) : p(e, h(t));"viewport" === n ? s = function (e, t) {
            var i = 1 < arguments.length && void 0 !== t && t,
                n = e.ownerDocument.documentElement,
                o = C(e, n),
                r = Math.max(n.clientWidth, window.innerWidth || 0),
                t = Math.max(n.clientHeight, window.innerHeight || 0),
                e = i ? 0 : m(n),
                n = i ? 0 : m(n, "left");return x({ top: e - o.top + o.marginTop, left: n - o.left + o.marginLeft, width: r, height: t });
        }(a, r) : (o = void 0, "scrollParent" === n ? "BODY" === (o = u(c(t))).nodeName && (o = e.ownerDocument.documentElement) : o = "window" === n ? e.ownerDocument.documentElement : n, l = C(o, a, r), "HTML" !== o.nodeName || function e(t) {
            var i = t.nodeName;if ("BODY" === i || "HTML" === i) return !1;if ("fixed" === d(t, "position")) return !0;t = c(t);return !!t && e(t);
        }(a) ? s = l : (e = (a = y(e.ownerDocument)).height, a = a.width, s.top += l.top - l.marginTop, s.bottom = e + l.top, s.left += l.left - l.marginLeft, s.right = a + l.left));var l = "number" == typeof (i = i || 0);return s.left += l ? i : i.left || 0, s.top += l ? i : i.top || 0, s.right -= l ? i : i.right || 0, s.bottom -= l ? i : i.bottom || 0, s;
    }function S(e, t, i, n, o, r) {
        r = 5 < arguments.length && void 0 !== r ? r : 0;if (-1 === e.indexOf("auto")) return e;var o = T(i, n, r, o),
            s = { top: { width: o.width, height: t.top - o.top }, right: { width: o.right - t.right, height: o.height }, bottom: { width: o.width, height: o.bottom - t.bottom }, left: { width: t.left - o.left, height: o.height } },
            t = Object.keys(s).map(function (e) {
            return w({ key: e }, s[e], { area: (e = s[e]).width * e.height });
        }).sort(function (e, t) {
            return t.area - e.area;
        }),
            o = t.filter(function (e) {
            var t = e.width,
                e = e.height;return t >= i.clientWidth && e >= i.clientHeight;
        }),
            t = (0 < o.length ? o : t)[0].key,
            e = e.split("-")[1];return t + (e ? "-" + e : "");
    }function D(e, t, i, n) {
        n = 3 < arguments.length && void 0 !== n ? n : null;return C(i, n ? k(t) : p(t, h(i)), n);
    }function A(e) {
        var t = e.ownerDocument.defaultView.getComputedStyle(e),
            i = parseFloat(t.marginTop || 0) + parseFloat(t.marginBottom || 0),
            t = parseFloat(t.marginLeft || 0) + parseFloat(t.marginRight || 0);return { width: e.offsetWidth + t, height: e.offsetHeight + i };
    }function L(e) {
        var t = { left: "right", right: "left", bottom: "top", top: "bottom" };return e.replace(/left|right|bottom|top/g, function (e) {
            return t[e];
        });
    }function N(e, t, i) {
        i = i.split("-")[0];var n = A(e),
            o = { width: n.width, height: n.height },
            r = -1 !== ["right", "left"].indexOf(i),
            s = r ? "top" : "left",
            a = r ? "left" : "top",
            e = r ? "height" : "width",
            r = r ? "width" : "height";return o[s] = t[s] + t[e] / 2 - n[e] / 2, o[a] = i === a ? t[a] - n[r] : t[L(a)], o;
    }function I(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0];
    }function P(e, i, t) {
        return (void 0 === t ? e : e.slice(0, function (e, t, i) {
            if (Array.prototype.findIndex) return e.findIndex(function (e) {
                return e[t] === i;
            });var n = I(e, function (e) {
                return e[t] === i;
            });return e.indexOf(n);
        }(e, "name", t))).forEach(function (e) {
            e.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var t = e.function || e.fn;e.enabled && r(t) && (i.offsets.popper = x(i.offsets.popper), i.offsets.reference = x(i.offsets.reference), i = t(i, e));
        }), i;
    }function j(e, i) {
        return e.some(function (e) {
            var t = e.name;return e.enabled && t === i;
        });
    }function O(e) {
        for (var t = [!1, "ms", "Webkit", "Moz", "O"], i = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
            var o = t[n],
                o = o ? "" + o + i : e;if (void 0 !== document.body.style[o]) return o;
        }return null;
    }function R(e) {
        e = e.ownerDocument;return e ? e.defaultView : window;
    }function q(e, t, i, n) {
        i.updateBound = n, R(e).addEventListener("resize", i.updateBound, { passive: !0 });e = u(e);return function e(t, i, n, o) {
            var r = "BODY" === t.nodeName,
                t = r ? t.ownerDocument.defaultView : t;t.addEventListener(i, n, { passive: !0 }), r || e(u(t.parentNode), i, n, o), o.push(t);
        }(e, "scroll", i.updateBound, i.scrollParents), i.scrollElement = e, i.eventsEnabled = !0, i;
    }function F() {
        var e, t;this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (e = this.reference, t = this.state, R(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function (e) {
            e.removeEventListener("scroll", t.updateBound);
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t));
    }function M(e) {
        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
    }function H(i, n) {
        Object.keys(n).forEach(function (e) {
            var t = "";-1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(e) && M(n[e]) && (t = "px"), i.style[e] = n[e] + t;
        });
    }var z = i && /Firefox/i.test(navigator.userAgent);function B(e, t, i) {
        var n = I(e, function (e) {
            return e.name === t;
        }),
            o = !!n && e.some(function (e) {
            return e.name === i && e.enabled && e.order < n.order;
        });return o || (e = "`" + t + "`", console.warn("`" + i + "`" + " modifier is required by " + e + " modifier in order to work, be sure to include it before " + e + "!")), o;
    }var W = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        U = W.slice(3);function $(e, t) {
        t = 1 < arguments.length && void 0 !== t && t, e = U.indexOf(e), e = U.slice(e + 1).concat(U.slice(0, e));return t ? e.reverse() : e;
    }var V = "flip",
        Q = "clockwise",
        X = "counterclockwise";function Y(e, a, l, t) {
        var o = [0, 0],
            n = -1 !== ["right", "left"].indexOf(t),
            i = e.split(/(\+|\-)/).map(function (e) {
            return e.trim();
        }),
            t = i.indexOf(I(i, function (e) {
            return -1 !== e.search(/,|\s/);
        }));i[t] && -1 === i[t].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");e = /\s*,\s*|\s+/;return (-1 !== t ? [i.slice(0, t).concat([i[t].split(e)[0]]), [i[t].split(e)[1]].concat(i.slice(t + 1))] : [i]).map(function (e, t) {
            var s = (1 === t ? !n : n) ? "height" : "width",
                i = !1;return e.reduce(function (e, t) {
                return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, i = !0, e) : i ? (e[e.length - 1] += t, i = !1, e) : e.concat(t);
            }, []).map(function (e) {
                return i = s, n = a, o = l, e = +(r = (t = e).match(/((?:\-|\+)?\d*\.?\d*)(.*)/))[1], r = r[2], e ? 0 === r.indexOf("%") ? x("%p" === r ? n : o)[i] / 100 * e : "vh" !== r && "vw" !== r ? e : ("vh" === r ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * e : t;var t, i, n, o, r;
            });
        }).forEach(function (i, n) {
            i.forEach(function (e, t) {
                M(e) && (o[n] += e * ("-" === i[t - 1] ? -1 : 1));
            });
        }), o;
    }var K = { placement: "bottom", positionFixed: !1, eventsEnabled: !0, removeOnDestroy: !1, onCreate: function onCreate() {}, onUpdate: function onUpdate() {}, modifiers: { shift: { order: 100, enabled: !0, fn: function fn(e) {
                    var t,
                        i,
                        n = e.placement,
                        o = n.split("-")[0],
                        r = n.split("-")[1];return r && (t = (i = e.offsets).reference, n = i.popper, o = (i = -1 !== ["bottom", "top"].indexOf(o)) ? "width" : "height", o = { start: _({}, i = i ? "left" : "top", t[i]), end: _({}, i, t[i] + t[o] - n[o]) }, e.offsets.popper = w({}, n, o[r])), e;
                } }, offset: { order: 200, enabled: !0, fn: function fn(e, t) {
                    var i = t.offset,
                        n = e.placement,
                        o = (r = e.offsets).popper,
                        t = r.reference,
                        r = n.split("-")[0],
                        n = void 0,
                        n = M(+i) ? [+i, 0] : Y(i, o, t, r);return "left" === r ? (o.top += n[0], o.left -= n[1]) : "right" === r ? (o.top += n[0], o.left += n[1]) : "top" === r ? (o.left += n[0], o.top -= n[1]) : "bottom" === r && (o.left += n[0], o.top += n[1]), e.popper = o, e;
                }, offset: 0 }, preventOverflow: { order: 300, enabled: !0, fn: function fn(e, n) {
                    var t = n.boundariesElement || g(e.instance.popper);e.instance.reference === t && (t = g(t));var i = O("transform"),
                        o = e.instance.popper.style,
                        r = o.top,
                        s = o.left,
                        a = o[i];o.top = "", o.left = "", o[i] = "";var l = T(e.instance.popper, e.instance.reference, n.padding, t, e.positionFixed);o.top = r, o.left = s, o[i] = a, n.boundaries = l;var a = n.priority,
                        c = e.offsets.popper,
                        u = { primary: function primary(e) {
                            var t = c[e];return c[e] < l[e] && !n.escapeWithReference && (t = Math.max(c[e], l[e])), _({}, e, t);
                        }, secondary: function secondary(e) {
                            var t = "right" === e ? "left" : "top",
                                i = c[t];return c[e] > l[e] && !n.escapeWithReference && (i = Math.min(c[t], l[e] - ("right" === e ? c.width : c.height))), _({}, t, i);
                        } };return a.forEach(function (e) {
                        var t = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";c = w({}, c, u[t](e));
                    }), e.offsets.popper = c, e;
                }, priority: ["left", "right", "top", "bottom"], padding: 5, boundariesElement: "scrollParent" }, keepTogether: { order: 400, enabled: !0, fn: function fn(e) {
                    var t = (r = e.offsets).popper,
                        i = r.reference,
                        n = e.placement.split("-")[0],
                        o = Math.floor,
                        r = (s = -1 !== ["top", "bottom"].indexOf(n)) ? "right" : "bottom",
                        n = s ? "left" : "top",
                        s = s ? "width" : "height";return t[r] < o(i[n]) && (e.offsets.popper[n] = o(i[n]) - t[s]), t[n] > o(i[r]) && (e.offsets.popper[n] = o(i[r])), e;
                } }, arrow: { order: 500, enabled: !0, fn: function fn(e, t) {
                    if (!B(e.instance.modifiers, "arrow", "keepTogether")) return e;var i = t.element;if ("string" == typeof i) {
                        if (!(i = e.instance.popper.querySelector(i))) return e;
                    } else if (!e.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;var n = e.placement.split("-")[0],
                        o = (u = e.offsets).popper,
                        r = u.reference,
                        s = -1 !== ["left", "right"].indexOf(n),
                        a = s ? "height" : "width",
                        l = s ? "Top" : "Left",
                        c = l.toLowerCase(),
                        t = s ? "left" : "top",
                        u = s ? "bottom" : "right",
                        n = A(i)[a];return r[u] - n < o[c] && (e.offsets.popper[c] -= o[c] - (r[u] - n)), r[c] + n > o[u] && (e.offsets.popper[c] += r[c] + n - o[u]), e.offsets.popper = x(e.offsets.popper), s = r[c] + r[a] / 2 - n / 2, u = d(e.instance.popper), r = parseFloat(u["margin" + l]), l = parseFloat(u["border" + l + "Width"]), l = s - e.offsets.popper[c] - r - l, l = Math.max(Math.min(o[a] - n, l), 0), e.arrowElement = i, e.offsets.arrow = (_(i = {}, c, Math.round(l)), _(i, t, ""), i), e;
                }, element: "[x-arrow]" }, flip: { order: 600, enabled: !0, fn: function fn(c, u) {
                    if (j(c.instance.modifiers, "inner")) return c;if (c.flipped && c.placement === c.originalPlacement) return c;var d = T(c.instance.popper, c.instance.reference, u.padding, u.boundariesElement, c.positionFixed),
                        h = c.placement.split("-")[0],
                        f = L(h),
                        p = c.placement.split("-")[1] || "",
                        m = [];switch (u.behavior) {case V:
                            m = [h, f];break;case Q:
                            m = $(h);break;case X:
                            m = $(h, !0);break;default:
                            m = u.behavior;}return m.forEach(function (e, t) {
                        if (h !== e || m.length === t + 1) return c;h = c.placement.split("-")[0], f = L(h);var i = c.offsets.popper,
                            n = c.offsets.reference,
                            o = Math.floor,
                            r = "left" === h && o(i.right) > o(n.left) || "right" === h && o(i.left) < o(n.right) || "top" === h && o(i.bottom) > o(n.top) || "bottom" === h && o(i.top) < o(n.bottom),
                            s = o(i.left) < o(d.left),
                            a = o(i.right) > o(d.right),
                            l = o(i.top) < o(d.top),
                            e = o(i.bottom) > o(d.bottom),
                            n = "left" === h && s || "right" === h && a || "top" === h && l || "bottom" === h && e,
                            i = -1 !== ["top", "bottom"].indexOf(h),
                            o = !!u.flipVariations && (i && "start" === p && s || i && "end" === p && a || !i && "start" === p && l || !i && "end" === p && e),
                            l = !!u.flipVariationsByContent && (i && "start" === p && a || i && "end" === p && s || !i && "start" === p && e || !i && "end" === p && l),
                            l = o || l;(r || n || l) && (c.flipped = !0, (r || n) && (h = m[t + 1]), l && (p = "end" === (l = p) ? "start" : "start" === l ? "end" : l), c.placement = h + (p ? "-" + p : ""), c.offsets.popper = w({}, c.offsets.popper, N(c.instance.popper, c.offsets.reference, c.placement)), c = P(c.instance.modifiers, c, "flip"));
                    }), c;
                }, behavior: "flip", padding: 5, boundariesElement: "viewport", flipVariations: !1, flipVariationsByContent: !1 }, inner: { order: 700, enabled: !1, fn: function fn(e) {
                    var t = e.placement,
                        i = t.split("-")[0],
                        n = (s = e.offsets).popper,
                        o = s.reference,
                        r = -1 !== ["left", "right"].indexOf(i),
                        s = -1 === ["top", "left"].indexOf(i);return n[r ? "left" : "top"] = o[i] - (s ? n[r ? "width" : "height"] : 0), e.placement = L(t), e.offsets.popper = x(n), e;
                } }, hide: { order: 800, enabled: !0, fn: function fn(e) {
                    if (!B(e.instance.modifiers, "hide", "preventOverflow")) return e;var t = e.offsets.reference,
                        i = I(e.instance.modifiers, function (e) {
                        return "preventOverflow" === e.name;
                    }).boundaries;if (t.bottom < i.top || t.left > i.right || t.top > i.bottom || t.right < i.left) {
                        if (!0 === e.hide) return e;e.hide = !0, e.attributes["x-out-of-boundaries"] = "";
                    } else {
                        if (!1 === e.hide) return e;e.hide = !1, e.attributes["x-out-of-boundaries"] = !1;
                    }return e;
                } }, computeStyle: { order: 850, enabled: !0, fn: function fn(e, t) {
                    var i = t.x,
                        n = t.y,
                        o = e.offsets.popper;void 0 !== (p = I(e.instance.modifiers, function (e) {
                        return "applyStyle" === e.name;
                    }).gpuAcceleration) && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var r,
                        s,
                        a,
                        l,
                        c = void 0 !== p ? p : t.gpuAcceleration,
                        u = g(e.instance.popper),
                        d = E(u),
                        h = { position: o.position },
                        f = (r = e, f = window.devicePixelRatio < 2 || !z, m = (l = r.offsets).popper, s = l.reference, a = Math.round, p = Math.floor, t = function t(e) {
                        return e;
                    }, o = a(s.width), l = a(m.width), s = -1 !== ["left", "right"].indexOf(r.placement), r = -1 !== r.placement.indexOf("-"), p = f ? s || r || o % 2 == l % 2 ? a : p : t, t = f ? a : t, { left: p(o % 2 == 1 && l % 2 == 1 && !r && f ? m.left - 1 : m.left), top: t(m.top), bottom: t(m.bottom), right: p(m.right) }),
                        t = "bottom" === i ? "top" : "bottom",
                        p = "right" === n ? "left" : "right",
                        m = O("transform"),
                        i = void 0,
                        n = void 0,
                        n = "bottom" == t ? "HTML" === u.nodeName ? -u.clientHeight + f.bottom : -d.height + f.bottom : f.top,
                        i = "right" == p ? "HTML" === u.nodeName ? -u.clientWidth + f.right : -d.width + f.right : f.left;return c && m ? (h[m] = "translate3d(" + i + "px, " + n + "px, 0)", h[t] = 0, h[p] = 0, h.willChange = "transform") : (m = "right" == p ? -1 : 1, h[t] = n * ("bottom" == t ? -1 : 1), h[p] = i * m, h.willChange = t + ", " + p), p = { "x-placement": e.placement }, e.attributes = w({}, p, e.attributes), e.styles = w({}, h, e.styles), e.arrowStyles = w({}, e.offsets.arrow, e.arrowStyles), e;
                }, gpuAcceleration: !0, x: "bottom", y: "right" }, applyStyle: { order: 900, enabled: !0, fn: function fn(e) {
                    var t, i;return H(e.instance.popper, e.styles), t = e.instance.popper, i = e.attributes, Object.keys(i).forEach(function (e) {
                        !1 !== i[e] ? t.setAttribute(e, i[e]) : t.removeAttribute(e);
                    }), e.arrowElement && Object.keys(e.arrowStyles).length && H(e.arrowElement, e.arrowStyles), e;
                }, onLoad: function onLoad(e, t, i, n, o) {
                    return o = D(o, t, e, i.positionFixed), e = S(i.placement, o, t, e, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding), t.setAttribute("x-placement", e), H(t, { position: i.positionFixed ? "fixed" : "absolute" }), i;
                }, gpuAcceleration: void 0 } } },
        e = (e(G, [{ key: "update", value: function value() {
            return function () {
                var e;this.state.isDestroyed || ((e = { instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {} }).offsets.reference = D(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = S(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = N(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = P(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e)));
            }.call(this);
        } }, { key: "destroy", value: function value() {
            return function () {
                return this.state.isDestroyed = !0, j(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[O("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
            }.call(this);
        } }, { key: "enableEventListeners", value: function value() {
            return function () {
                this.state.eventsEnabled || (this.state = q(this.reference, this.options, this.state, this.scheduleUpdate));
            }.call(this);
        } }, { key: "disableEventListeners", value: function value() {
            return F.call(this);
        } }]), G);function G(e, t) {
        var i = this,
            n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};!function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, G), this.scheduleUpdate = function () {
            return requestAnimationFrame(i.update);
        }, this.update = o(this.update.bind(this)), this.options = w({}, G.Defaults, n), this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }, this.reference = e && e.jquery ? e[0] : e, this.popper = t && t.jquery ? t[0] : t, this.options.modifiers = {}, Object.keys(w({}, G.Defaults.modifiers, n.modifiers)).forEach(function (e) {
            i.options.modifiers[e] = w({}, G.Defaults.modifiers[e] || {}, n.modifiers ? n.modifiers[e] : {});
        }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
            return w({ name: e }, i.options.modifiers[e]);
        }).sort(function (e, t) {
            return e.order - t.order;
        }), this.modifiers.forEach(function (e) {
            e.enabled && r(e.onLoad) && e.onLoad(i.reference, i.popper, i.options, e, i.state);
        }), this.update();t = this.options.eventsEnabled;t && this.enableEventListeners(), this.state.eventsEnabled = t;
    }return e.Utils = ("undefined" != typeof window ? window : global).PopperUtils, e.placements = W, e.Defaults = K, e;
}), function (e, t) {
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? t(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).bootstrap = {}, e.jQuery, e.Popper);
}(this, function (e, u, o) {
    "use strict";
    function n(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
    }function s(e, t, i) {
        return t && n(e.prototype, t), i && n(e, i), e;
    }function a() {
        return (a = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var i,
                    n = arguments[t];for (i in n) {
                    Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
                }
            }return e;
        }).apply(this, arguments);
    }u = u && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u, o = o && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;var t = "transitionend";function i(e) {
        var t = this,
            i = !1;return u(this).one(d.TRANSITION_END, function () {
            i = !0;
        }), setTimeout(function () {
            i || d.triggerTransitionEnd(t);
        }, e), this;
    }var d = { TRANSITION_END: "bsTransitionEnd", getUID: function getUID(e) {
            for (; e += ~~(1e6 * Math.random()), document.getElementById(e);) {}return e;
        }, getSelectorFromElement: function getSelectorFromElement(e) {
            var t = e.getAttribute("data-target");t && "#" !== t || (t = (e = e.getAttribute("href")) && "#" !== e ? e.trim() : "");try {
                return document.querySelector(t) ? t : null;
            } catch (e) {
                return null;
            }
        }, getTransitionDurationFromElement: function getTransitionDurationFromElement(e) {
            if (!e) return 0;var t = u(e).css("transition-duration"),
                i = u(e).css("transition-delay"),
                n = parseFloat(t),
                e = parseFloat(i);return n || e ? (t = t.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(t) + parseFloat(i))) : 0;
        }, reflow: function reflow(e) {
            return e.offsetHeight;
        }, triggerTransitionEnd: function triggerTransitionEnd(e) {
            u(e).trigger(t);
        }, supportsTransitionEnd: function supportsTransitionEnd() {
            return Boolean(t);
        }, isElement: function isElement(e) {
            return (e[0] || e).nodeType;
        }, typeCheckConfig: function typeCheckConfig(e, t, i) {
            for (var n in i) {
                if (Object.prototype.hasOwnProperty.call(i, n)) {
                    var o = i[n],
                        r = t[n],
                        s = r && d.isElement(r) ? "element" : null == (s = r) ? "" + s : {}.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase();if (!new RegExp(o).test(s)) throw new Error(e.toUpperCase() + ': Option "' + n + '" provided type "' + s + '" but expected type "' + o + '".');
                }
            }var s;
        }, findShadowRoot: function findShadowRoot(e) {
            if (!document.documentElement.attachShadow) return null;if ("function" != typeof e.getRootNode) return e instanceof ShadowRoot ? e : e.parentNode ? d.findShadowRoot(e.parentNode) : null;e = e.getRootNode();return e instanceof ShadowRoot ? e : null;
        }, jQueryDetection: function jQueryDetection() {
            if (void 0 === u) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var e = u.fn.jquery.split(" ")[0].split(".");if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || 4 <= e[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
        } };d.jQueryDetection(), u.fn.emulateTransitionEnd = i, u.event.special[d.TRANSITION_END] = { bindType: t, delegateType: t, handle: function handle(e) {
            if (u(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
        } };var r = "alert",
        l = "bs.alert",
        c = u.fn[r],
        h = function () {
        function n(e) {
            this._element = e;
        }var e = n.prototype;return e.close = function (e) {
            var t = this._element;e && (t = this._getRootElement(e)), this._triggerCloseEvent(t).isDefaultPrevented() || this._removeElement(t);
        }, e.dispose = function () {
            u.removeData(this._element, l), this._element = null;
        }, e._getRootElement = function (e) {
            var t = d.getSelectorFromElement(e),
                i = !1;return i = (i = t ? document.querySelector(t) : i) || u(e).closest(".alert")[0];
        }, e._triggerCloseEvent = function (e) {
            var t = u.Event("close.bs.alert");return u(e).trigger(t), t;
        }, e._removeElement = function (t) {
            var e,
                i = this;u(t).removeClass("show"), u(t).hasClass("fade") ? (e = d.getTransitionDurationFromElement(t), u(t).one(d.TRANSITION_END, function (e) {
                return i._destroyElement(t, e);
            }).emulateTransitionEnd(e)) : this._destroyElement(t);
        }, e._destroyElement = function (e) {
            u(e).detach().trigger("closed.bs.alert").remove();
        }, n._jQueryInterface = function (i) {
            return this.each(function () {
                var e = u(this),
                    t = e.data(l);t || (t = new n(this), e.data(l, t)), "close" === i && t[i](this);
            });
        }, n._handleDismiss = function (t) {
            return function (e) {
                e && e.preventDefault(), t.close(this);
            };
        }, s(n, null, [{ key: "VERSION", get: function get() {
                return "4.5.2";
            } }]), n;
    }();u(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', h._handleDismiss(new h())), u.fn[r] = h._jQueryInterface, u.fn[r].Constructor = h, u.fn[r].noConflict = function () {
        return u.fn[r] = c, h._jQueryInterface;
    };var f = "button",
        p = "bs.button",
        m = u.fn[f],
        g = "active",
        v = '[data-toggle^="button"]',
        y = 'input:not([type="hidden"])',
        b = function () {
        function i(e) {
            this._element = e;
        }var e = i.prototype;return e.toggle = function () {
            var e,
                t = !0,
                i = !0,
                n = u(this._element).closest('[data-toggle="buttons"]')[0];!n || (e = this._element.querySelector(y)) && ("radio" === e.type && (e.checked && this._element.classList.contains(g) ? t = !1 : (n = n.querySelector(".active")) && u(n).removeClass(g)), t && ("checkbox" !== e.type && "radio" !== e.type || (e.checked = !this._element.classList.contains(g)), u(e).trigger("change")), e.focus(), i = !1), this._element.hasAttribute("disabled") || this._element.classList.contains("disabled") || (i && this._element.setAttribute("aria-pressed", !this._element.classList.contains(g)), t && u(this._element).toggleClass(g));
        }, e.dispose = function () {
            u.removeData(this._element, p), this._element = null;
        }, i._jQueryInterface = function (t) {
            return this.each(function () {
                var e = u(this).data(p);e || (e = new i(this), u(this).data(p, e)), "toggle" === t && e[t]();
            });
        }, s(i, null, [{ key: "VERSION", get: function get() {
                return "4.5.2";
            } }]), i;
    }();u(document).on("click.bs.button.data-api", v, function (e) {
        var t,
            i = e.target,
            n = i;!(i = !u(i).hasClass("btn") ? u(i).closest(".btn")[0] : i) || i.hasAttribute("disabled") || i.classList.contains("disabled") || (t = i.querySelector(y)) && (t.hasAttribute("disabled") || t.classList.contains("disabled")) ? e.preventDefault() : ("LABEL" !== n.tagName || t && "checkbox" !== t.type) && b._jQueryInterface.call(u(i), "toggle");
    }).on("focus.bs.button.data-api blur.bs.button.data-api", v, function (e) {
        var t = u(e.target).closest(".btn")[0];u(t).toggleClass("focus", /^focus(in)?$/.test(e.type));
    }), u(window).on("load.bs.button.data-api", function () {
        for (var e = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), t = 0, i = e.length; t < i; t++) {
            var n = e[t],
                o = n.querySelector(y);o.checked || o.hasAttribute("checked") ? n.classList.add(g) : n.classList.remove(g);
        }for (var r = 0, s = (e = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; r < s; r++) {
            var a = e[r];"true" === a.getAttribute("aria-pressed") ? a.classList.add(g) : a.classList.remove(g);
        }
    }), u.fn[f] = b._jQueryInterface, u.fn[f].Constructor = b, u.fn[f].noConflict = function () {
        return u.fn[f] = m, b._jQueryInterface;
    };var _ = "carousel",
        w = "bs.carousel",
        x = "." + w,
        E = u.fn[_],
        C = { interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0, touch: !0 },
        k = { interval: "(number|boolean)", keyboard: "boolean", slide: "(boolean|string)", pause: "(string|boolean)", wrap: "boolean", touch: "boolean" },
        T = "next",
        S = "prev",
        D = "slid" + x,
        A = "active",
        L = ".active.carousel-item",
        N = { TOUCH: "touch", PEN: "pen" },
        I = function () {
        function o(e, t) {
            this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(t), this._element = e, this._indicatorsElement = this._element.querySelector(".carousel-indicators"), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners();
        }var e = o.prototype;return e.next = function () {
            this._isSliding || this._slide(T);
        }, e.nextWhenVisible = function () {
            !document.hidden && u(this._element).is(":visible") && "hidden" !== u(this._element).css("visibility") && this.next();
        }, e.prev = function () {
            this._isSliding || this._slide(S);
        }, e.pause = function (e) {
            e || (this._isPaused = !0), this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (d.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null;
        }, e.cycle = function (e) {
            e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
        }, e.to = function (e) {
            var t = this;this._activeElement = this._element.querySelector(L);var i = this._getItemIndex(this._activeElement);if (!(e > this._items.length - 1 || e < 0)) if (this._isSliding) u(this._element).one(D, function () {
                return t.to(e);
            });else {
                if (i === e) return this.pause(), void this.cycle();this._slide(i < e ? T : S, this._items[e]);
            }
        }, e.dispose = function () {
            u(this._element).off(x), u.removeData(this._element, w), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null;
        }, e._getConfig = function (e) {
            return e = a({}, C, e), d.typeCheckConfig(_, e, k), e;
        }, e._handleSwipe = function () {
            var e = Math.abs(this.touchDeltaX);e <= 40 || (e = e / this.touchDeltaX, (this.touchDeltaX = 0) < e && this.prev(), e < 0 && this.next());
        }, e._addEventListeners = function () {
            var t = this;this._config.keyboard && u(this._element).on("keydown.bs.carousel", function (e) {
                return t._keydown(e);
            }), "hover" === this._config.pause && u(this._element).on("mouseenter.bs.carousel", function (e) {
                return t.pause(e);
            }).on("mouseleave.bs.carousel", function (e) {
                return t.cycle(e);
            }), this._config.touch && this._addTouchEventListeners();
        }, e._addTouchEventListeners = function () {
            var e,
                t,
                i = this;this._touchSupported && (e = function e(_e3) {
                i._pointerEvent && N[_e3.originalEvent.pointerType.toUpperCase()] ? i.touchStartX = _e3.originalEvent.clientX : i._pointerEvent || (i.touchStartX = _e3.originalEvent.touches[0].clientX);
            }, t = function t(e) {
                i._pointerEvent && N[e.originalEvent.pointerType.toUpperCase()] && (i.touchDeltaX = e.originalEvent.clientX - i.touchStartX), i._handleSwipe(), "hover" === i._config.pause && (i.pause(), i.touchTimeout && clearTimeout(i.touchTimeout), i.touchTimeout = setTimeout(function (e) {
                    return i.cycle(e);
                }, 500 + i._config.interval));
            }, u(this._element.querySelectorAll(".carousel-item img")).on("dragstart.bs.carousel", function (e) {
                return e.preventDefault();
            }), this._pointerEvent ? (u(this._element).on("pointerdown.bs.carousel", e), u(this._element).on("pointerup.bs.carousel", t), this._element.classList.add("pointer-event")) : (u(this._element).on("touchstart.bs.carousel", e), u(this._element).on("touchmove.bs.carousel", function (e) {
                (e = e).originalEvent.touches && 1 < e.originalEvent.touches.length ? i.touchDeltaX = 0 : i.touchDeltaX = e.originalEvent.touches[0].clientX - i.touchStartX;
            }), u(this._element).on("touchend.bs.carousel", t)));
        }, e._keydown = function (e) {
            if (!/input|textarea/i.test(e.target.tagName)) switch (e.which) {case 37:
                    e.preventDefault(), this.prev();break;case 39:
                    e.preventDefault(), this.next();}
        }, e._getItemIndex = function (e) {
            return this._items = e && e.parentNode ? [].slice.call(e.parentNode.querySelectorAll(".carousel-item")) : [], this._items.indexOf(e);
        }, e._getItemByDirection = function (e, t) {
            var i = e === T,
                n = e === S,
                o = this._getItemIndex(t),
                r = this._items.length - 1;if ((n && 0 === o || i && o === r) && !this._config.wrap) return t;e = (o + (e === S ? -1 : 1)) % this._items.length;return -1 == e ? this._items[this._items.length - 1] : this._items[e];
        }, e._triggerSlideEvent = function (e, t) {
            var i = this._getItemIndex(e),
                n = this._getItemIndex(this._element.querySelector(L)),
                i = u.Event("slide.bs.carousel", { relatedTarget: e, direction: t, from: n, to: i });return u(this._element).trigger(i), i;
        }, e._setActiveIndicatorElement = function (e) {
            var t;this._indicatorsElement && (t = [].slice.call(this._indicatorsElement.querySelectorAll(".active")), u(t).removeClass(A), (e = this._indicatorsElement.children[this._getItemIndex(e)]) && u(e).addClass(A));
        }, e._slide = function (e, t) {
            var i,
                n,
                o,
                r = this,
                s = this._element.querySelector(L),
                a = this._getItemIndex(s),
                l = t || s && this._getItemByDirection(e, s),
                c = this._getItemIndex(l),
                t = Boolean(this._interval),
                e = e === T ? (i = "carousel-item-left", n = "carousel-item-next", "left") : (i = "carousel-item-right", n = "carousel-item-prev", "right");l && u(l).hasClass(A) ? this._isSliding = !1 : this._triggerSlideEvent(l, e).isDefaultPrevented() || s && l && (this._isSliding = !0, t && this.pause(), this._setActiveIndicatorElement(l), o = u.Event(D, { relatedTarget: l, direction: e, from: a, to: c }), u(this._element).hasClass("slide") ? (u(l).addClass(n), d.reflow(l), u(s).addClass(i), u(l).addClass(i), (c = parseInt(l.getAttribute("data-interval"), 10)) ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = c) : this._config.interval = this._config.defaultInterval || this._config.interval, c = d.getTransitionDurationFromElement(s), u(s).one(d.TRANSITION_END, function () {
                u(l).removeClass(i + " " + n).addClass(A), u(s).removeClass(A + " " + n + " " + i), r._isSliding = !1, setTimeout(function () {
                    return u(r._element).trigger(o);
                }, 0);
            }).emulateTransitionEnd(c)) : (u(s).removeClass(A), u(l).addClass(A), this._isSliding = !1, u(this._element).trigger(o)), t && this.cycle());
        }, o._jQueryInterface = function (n) {
            return this.each(function () {
                var e = u(this).data(w),
                    t = a({}, C, u(this).data());"object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) && (t = a({}, t, n));var i = "string" == typeof n ? n : t.slide;if (e || (e = new o(this, t), u(this).data(w, e)), "number" == typeof n) e.to(n);else if ("string" == typeof i) {
                    if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');e[i]();
                } else t.interval && t.ride && (e.pause(), e.cycle());
            });
        }, o._dataApiClickHandler = function (e) {
            var t,
                i,
                n = d.getSelectorFromElement(this);!n || (t = u(n)[0]) && u(t).hasClass("carousel") && (i = a({}, u(t).data(), u(this).data()), (n = this.getAttribute("data-slide-to")) && (i.interval = !1), o._jQueryInterface.call(u(t), i), n && u(t).data(w).to(n), e.preventDefault());
        }, s(o, null, [{ key: "VERSION", get: function get() {
                return "4.5.2";
            } }, { key: "Default", get: function get() {
                return C;
            } }]), o;
    }();u(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", I._dataApiClickHandler), u(window).on("load.bs.carousel.data-api", function () {
        for (var e = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), t = 0, i = e.length; t < i; t++) {
            var n = u(e[t]);I._jQueryInterface.call(n, n.data());
        }
    }), u.fn[_] = I._jQueryInterface, u.fn[_].Constructor = I, u.fn[_].noConflict = function () {
        return u.fn[_] = E, I._jQueryInterface;
    };var P = "collapse",
        j = "bs.collapse",
        O = u.fn[P],
        R = { toggle: !0, parent: "" },
        q = { toggle: "boolean", parent: "(string|element)" },
        F = "show",
        M = "collapse",
        H = "collapsing",
        z = "collapsed",
        B = '[data-toggle="collapse"]',
        W = function () {
        function r(t, e) {
            this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));for (var i = [].slice.call(document.querySelectorAll(B)), n = 0, o = i.length; n < o; n++) {
                var r = i[n],
                    s = d.getSelectorFromElement(r),
                    a = [].slice.call(document.querySelectorAll(s)).filter(function (e) {
                    return e === t;
                });null !== s && 0 < a.length && (this._selector = s, this._triggerArray.push(r));
            }this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle();
        }var e = r.prototype;return e.toggle = function () {
            u(this._element).hasClass(F) ? this.hide() : this.show();
        }, e.show = function () {
            var e,
                t,
                i,
                n,
                o = this;this._isTransitioning || u(this._element).hasClass(F) || (n = this._parent && 0 === (n = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function (e) {
                return "string" == typeof o._config.parent ? e.getAttribute("data-parent") === o._config.parent : e.classList.contains(M);
            })).length ? null : n) && (i = u(n).not(this._selector).data(j)) && i._isTransitioning || (e = u.Event("show.bs.collapse"), u(this._element).trigger(e), e.isDefaultPrevented() || (n && (r._jQueryInterface.call(u(n).not(this._selector), "hide"), i || u(n).data(j, null)), t = this._getDimension(), u(this._element).removeClass(M).addClass(H), this._element.style[t] = 0, this._triggerArray.length && u(this._triggerArray).removeClass(z).attr("aria-expanded", !0), this.setTransitioning(!0), i = "scroll" + (t[0].toUpperCase() + t.slice(1)), n = d.getTransitionDurationFromElement(this._element), u(this._element).one(d.TRANSITION_END, function () {
                u(o._element).removeClass(H).addClass(M + " " + F), o._element.style[t] = "", o.setTransitioning(!1), u(o._element).trigger("shown.bs.collapse");
            }).emulateTransitionEnd(n), this._element.style[t] = this._element[i] + "px"));
        }, e.hide = function () {
            var e = this;if (!this._isTransitioning && u(this._element).hasClass(F)) {
                var t = u.Event("hide.bs.collapse");if (u(this._element).trigger(t), !t.isDefaultPrevented()) {
                    t = this._getDimension();this._element.style[t] = this._element.getBoundingClientRect()[t] + "px", d.reflow(this._element), u(this._element).addClass(H).removeClass(M + " " + F);var i = this._triggerArray.length;if (0 < i) for (var n = 0; n < i; n++) {
                        var o = this._triggerArray[n],
                            r = d.getSelectorFromElement(o);null !== r && (u([].slice.call(document.querySelectorAll(r))).hasClass(F) || u(o).addClass(z).attr("aria-expanded", !1));
                    }this.setTransitioning(!0);this._element.style[t] = "";t = d.getTransitionDurationFromElement(this._element);u(this._element).one(d.TRANSITION_END, function () {
                        e.setTransitioning(!1), u(e._element).removeClass(H).addClass(M).trigger("hidden.bs.collapse");
                    }).emulateTransitionEnd(t);
                }
            }
        }, e.setTransitioning = function (e) {
            this._isTransitioning = e;
        }, e.dispose = function () {
            u.removeData(this._element, j), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null;
        }, e._getConfig = function (e) {
            return (e = a({}, R, e)).toggle = Boolean(e.toggle), d.typeCheckConfig(P, e, q), e;
        }, e._getDimension = function () {
            return u(this._element).hasClass("width") ? "width" : "height";
        }, e._getParent = function () {
            var e,
                i = this;d.isElement(this._config.parent) ? (e = this._config.parent, void 0 !== this._config.parent.jquery && (e = this._config.parent[0])) : e = document.querySelector(this._config.parent);var t = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                t = [].slice.call(e.querySelectorAll(t));return u(t).each(function (e, t) {
                i._addAriaAndCollapsedClass(r._getTargetFromElement(t), [t]);
            }), e;
        }, e._addAriaAndCollapsedClass = function (e, t) {
            e = u(e).hasClass(F);t.length && u(t).toggleClass(z, !e).attr("aria-expanded", e);
        }, r._getTargetFromElement = function (e) {
            e = d.getSelectorFromElement(e);return e ? document.querySelector(e) : null;
        }, r._jQueryInterface = function (n) {
            return this.each(function () {
                var e = u(this),
                    t = e.data(j),
                    i = a({}, R, e.data(), "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) && n ? n : {});if (!t && i.toggle && "string" == typeof n && /show|hide/.test(n) && (i.toggle = !1), t || (t = new r(this, i), e.data(j, t)), "string" == typeof n) {
                    if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');t[n]();
                }
            });
        }, s(r, null, [{ key: "VERSION", get: function get() {
                return "4.5.2";
            } }, { key: "Default", get: function get() {
                return R;
            } }]), r;
    }();u(document).on("click.bs.collapse.data-api", B, function (e) {
        "A" === e.currentTarget.tagName && e.preventDefault();var i = u(this),
            e = d.getSelectorFromElement(this),
            e = [].slice.call(document.querySelectorAll(e));u(e).each(function () {
            var e = u(this),
                t = e.data(j) ? "toggle" : i.data();W._jQueryInterface.call(e, t);
        });
    }), u.fn[P] = W._jQueryInterface, u.fn[P].Constructor = W, u.fn[P].noConflict = function () {
        return u.fn[P] = O, W._jQueryInterface;
    };var U = "dropdown",
        $ = "bs.dropdown",
        V = "." + $,
        v = ".data-api",
        Q = u.fn[U],
        X = new RegExp("38|40|27"),
        Y = "hide" + V,
        K = "hidden" + V,
        G = "click" + V + v,
        J = "keydown" + V + v,
        Z = "disabled",
        ee = "show",
        te = "dropdown-menu-right",
        ie = '[data-toggle="dropdown"]',
        ne = ".dropdown-menu",
        oe = { offset: 0, flip: !0, boundary: "scrollParent", reference: "toggle", display: "dynamic", popperConfig: null },
        re = { offset: "(number|string|function)", flip: "boolean", boundary: "(string|element)", reference: "(string|element)", display: "string", popperConfig: "(null|object)" },
        se = function () {
        function c(e, t) {
            this._element = e, this._popper = null, this._config = this._getConfig(t), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners();
        }var e = c.prototype;return e.toggle = function () {
            var e;this._element.disabled || u(this._element).hasClass(Z) || (e = u(this._menu).hasClass(ee), c._clearMenus(), e || this.show(!0));
        }, e.show = function (e) {
            if (void 0 === e && (e = !1), !(this._element.disabled || u(this._element).hasClass(Z) || u(this._menu).hasClass(ee))) {
                var t = { relatedTarget: this._element },
                    i = u.Event("show.bs.dropdown", t),
                    n = c._getParentFromElement(this._element);if (u(n).trigger(i), !i.isDefaultPrevented()) {
                    if (!this._inNavbar && e) {
                        if (void 0 === o) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");e = this._element;"parent" === this._config.reference ? e = n : d.isElement(this._config.reference) && (e = this._config.reference, void 0 !== this._config.reference.jquery && (e = this._config.reference[0])), "scrollParent" !== this._config.boundary && u(n).addClass("position-static"), this._popper = new o(e, this._menu, this._getPopperConfig());
                    }"ontouchstart" in document.documentElement && 0 === u(n).closest(".navbar-nav").length && u(document.body).children().on("mouseover", null, u.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), u(this._menu).toggleClass(ee), u(n).toggleClass(ee).trigger(u.Event("shown.bs.dropdown", t));
                }
            }
        }, e.hide = function () {
            var e, t, i;this._element.disabled || u(this._element).hasClass(Z) || !u(this._menu).hasClass(ee) || (e = { relatedTarget: this._element }, t = u.Event(Y, e), i = c._getParentFromElement(this._element), u(i).trigger(t), t.isDefaultPrevented() || (this._popper && this._popper.destroy(), u(this._menu).toggleClass(ee), u(i).toggleClass(ee).trigger(u.Event(K, e))));
        }, e.dispose = function () {
            u.removeData(this._element, $), u(this._element).off(V), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null);
        }, e.update = function () {
            this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate();
        }, e._addEventListeners = function () {
            var t = this;u(this._element).on("click.bs.dropdown", function (e) {
                e.preventDefault(), e.stopPropagation(), t.toggle();
            });
        }, e._getConfig = function (e) {
            return e = a({}, this.constructor.Default, u(this._element).data(), e), d.typeCheckConfig(U, e, this.constructor.DefaultType), e;
        }, e._getMenuElement = function () {
            var e;return this._menu || (e = c._getParentFromElement(this._element)) && (this._menu = e.querySelector(ne)), this._menu;
        }, e._getPlacement = function () {
            var e = u(this._element.parentNode),
                t = "bottom-start";return e.hasClass("dropup") ? t = u(this._menu).hasClass(te) ? "top-end" : "top-start" : e.hasClass("dropright") ? t = "right-start" : e.hasClass("dropleft") ? t = "left-start" : u(this._menu).hasClass(te) && (t = "bottom-end"), t;
        }, e._detectNavbar = function () {
            return 0 < u(this._element).closest(".navbar").length;
        }, e._getOffset = function () {
            var t = this,
                e = {};return "function" == typeof this._config.offset ? e.fn = function (e) {
                return e.offsets = a({}, e.offsets, t._config.offset(e.offsets, t._element) || {}), e;
            } : e.offset = this._config.offset, e;
        }, e._getPopperConfig = function () {
            var e = { placement: this._getPlacement(), modifiers: { offset: this._getOffset(), flip: { enabled: this._config.flip }, preventOverflow: { boundariesElement: this._config.boundary } } };return "static" === this._config.display && (e.modifiers.applyStyle = { enabled: !1 }), a({}, e, this._config.popperConfig);
        }, c._jQueryInterface = function (t) {
            return this.each(function () {
                var e = u(this).data($);if (e || (e = new c(this, "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? t : null), u(this).data($, e)), "string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError('No method named "' + t + '"');e[t]();
                }
            });
        }, c._clearMenus = function (e) {
            if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which)) for (var t = [].slice.call(document.querySelectorAll(ie)), i = 0, n = t.length; i < n; i++) {
                var o,
                    r,
                    s = c._getParentFromElement(t[i]),
                    a = u(t[i]).data($),
                    l = { relatedTarget: t[i] };e && "click" === e.type && (l.clickEvent = e), a && (o = a._menu, u(s).hasClass(ee) && (e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && u.contains(s, e.target) || (r = u.Event(Y, l), u(s).trigger(r), r.isDefaultPrevented() || ("ontouchstart" in document.documentElement && u(document.body).children().off("mouseover", null, u.noop), t[i].setAttribute("aria-expanded", "false"), a._popper && a._popper.destroy(), u(o).removeClass(ee), u(s).removeClass(ee).trigger(u.Event(K, l))))));
            }
        }, c._getParentFromElement = function (e) {
            var t,
                i = d.getSelectorFromElement(e);return (t = i ? document.querySelector(i) : t) || e.parentNode;
        }, c._dataApiKeydownHandler = function (e) {
            if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || u(e.target).closest(ne).length)) : X.test(e.which)) && !this.disabled && !u(this).hasClass(Z)) {
                var t = c._getParentFromElement(this),
                    i = u(t).hasClass(ee);if (i || 27 !== e.which) {
                    if (e.preventDefault(), e.stopPropagation(), !i || 27 === e.which || 32 === e.which) return 27 === e.which && u(t.querySelector(ie)).trigger("focus"), void u(this).trigger("click");i = [].slice.call(t.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter(function (e) {
                        return u(e).is(":visible");
                    });0 !== i.length && (t = i.indexOf(e.target), 38 === e.which && 0 < t && t--, 40 === e.which && t < i.length - 1 && t++, i[t = t < 0 ? 0 : t].focus());
                }
            }
        }, s(c, null, [{ key: "VERSION", get: function get() {
                return "4.5.2";
            } }, { key: "Default", get: function get() {
                return oe;
            } }, { key: "DefaultType", get: function get() {
                return re;
            } }]), c;
    }();u(document).on(J, ie, se._dataApiKeydownHandler).on(J, ne, se._dataApiKeydownHandler).on(G + " keyup.bs.dropdown.data-api", se._clearMenus).on(G, ie, function (e) {
        e.preventDefault(), e.stopPropagation(), se._jQueryInterface.call(u(this), "toggle");
    }).on(G, ".dropdown form", function (e) {
        e.stopPropagation();
    }), u.fn[U] = se._jQueryInterface, u.fn[U].Constructor = se, u.fn[U].noConflict = function () {
        return u.fn[U] = Q, se._jQueryInterface;
    };var ae = "modal",
        le = "bs.modal",
        ce = "." + le,
        ue = u.fn[ae],
        de = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
        he = { backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean" },
        fe = "hidden" + ce,
        pe = "show" + ce,
        me = "focusin" + ce,
        ge = "resize" + ce,
        ve = "click.dismiss" + ce,
        ye = "keydown.dismiss" + ce,
        be = "mousedown.dismiss" + ce,
        _e = "modal-open",
        we = "fade",
        xe = "show",
        Ee = "modal-static",
        Ce = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        ke = ".sticky-top",
        Te = function () {
        function o(e, t) {
            this._config = this._getConfig(t), this._element = e, this._dialog = e.querySelector(".modal-dialog"), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0;
        }var e = o.prototype;return e.toggle = function (e) {
            return this._isShown ? this.hide() : this.show(e);
        }, e.show = function (e) {
            var t,
                i = this;this._isShown || this._isTransitioning || (u(this._element).hasClass(we) && (this._isTransitioning = !0), t = u.Event(pe, { relatedTarget: e }), u(this._element).trigger(t), this._isShown || t.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), u(this._element).on(ve, '[data-dismiss="modal"]', function (e) {
                return i.hide(e);
            }), u(this._dialog).on(be, function () {
                u(i._element).one("mouseup.dismiss.bs.modal", function (e) {
                    u(e.target).is(i._element) && (i._ignoreBackdropClick = !0);
                });
            }), this._showBackdrop(function () {
                return i._showElement(e);
            })));
        }, e.hide = function (e) {
            var t = this;e && e.preventDefault(), this._isShown && !this._isTransitioning && (e = u.Event("hide.bs.modal"), u(this._element).trigger(e), this._isShown && !e.isDefaultPrevented() && (this._isShown = !1, (e = u(this._element).hasClass(we)) && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), u(document).off(me), u(this._element).removeClass(xe), u(this._element).off(ve), u(this._dialog).off(be), e ? (e = d.getTransitionDurationFromElement(this._element), u(this._element).one(d.TRANSITION_END, function (e) {
                return t._hideModal(e);
            }).emulateTransitionEnd(e)) : this._hideModal()));
        }, e.dispose = function () {
            [window, this._element, this._dialog].forEach(function (e) {
                return u(e).off(ce);
            }), u(document).off(me), u.removeData(this._element, le), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null;
        }, e.handleUpdate = function () {
            this._adjustDialog();
        }, e._getConfig = function (e) {
            return e = a({}, de, e), d.typeCheckConfig(ae, e, he), e;
        }, e._triggerBackdropTransition = function () {
            var e,
                t,
                i,
                n = this;"static" === this._config.backdrop ? (e = u.Event("hidePrevented.bs.modal"), u(this._element).trigger(e), e.defaultPrevented || ((t = this._element.scrollHeight > document.documentElement.clientHeight) || (this._element.style.overflowY = "hidden"), this._element.classList.add(Ee), i = d.getTransitionDurationFromElement(this._dialog), u(this._element).off(d.TRANSITION_END), u(this._element).one(d.TRANSITION_END, function () {
                n._element.classList.remove(Ee), t || u(n._element).one(d.TRANSITION_END, function () {
                    n._element.style.overflowY = "";
                }).emulateTransitionEnd(n._element, i);
            }).emulateTransitionEnd(i), this._element.focus())) : this.hide();
        }, e._showElement = function (e) {
            var t = this,
                i = u(this._element).hasClass(we),
                n = this._dialog ? this._dialog.querySelector(".modal-body") : null;this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), u(this._dialog).hasClass("modal-dialog-scrollable") && n ? n.scrollTop = 0 : this._element.scrollTop = 0, i && d.reflow(this._element), u(this._element).addClass(xe), this._config.focus && this._enforceFocus();var o = u.Event("shown.bs.modal", { relatedTarget: e }),
                e = function e() {
                t._config.focus && t._element.focus(), t._isTransitioning = !1, u(t._element).trigger(o);
            };i ? (i = d.getTransitionDurationFromElement(this._dialog), u(this._dialog).one(d.TRANSITION_END, e).emulateTransitionEnd(i)) : e();
        }, e._enforceFocus = function () {
            var t = this;u(document).off(me).on(me, function (e) {
                document !== e.target && t._element !== e.target && 0 === u(t._element).has(e.target).length && t._element.focus();
            });
        }, e._setEscapeEvent = function () {
            var t = this;this._isShown ? u(this._element).on(ye, function (e) {
                t._config.keyboard && 27 === e.which ? (e.preventDefault(), t.hide()) : t._config.keyboard || 27 !== e.which || t._triggerBackdropTransition();
            }) : this._isShown || u(this._element).off(ye);
        }, e._setResizeEvent = function () {
            var t = this;this._isShown ? u(window).on(ge, function (e) {
                return t.handleUpdate(e);
            }) : u(window).off(ge);
        }, e._hideModal = function () {
            var e = this;this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._showBackdrop(function () {
                u(document.body).removeClass(_e), e._resetAdjustments(), e._resetScrollbar(), u(e._element).trigger(fe);
            });
        }, e._removeBackdrop = function () {
            this._backdrop && (u(this._backdrop).remove(), this._backdrop = null);
        }, e._showBackdrop = function (e) {
            var t,
                i = this,
                n = u(this._element).hasClass(we) ? we : "";this._isShown && this._config.backdrop ? (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", n && this._backdrop.classList.add(n), u(this._backdrop).appendTo(document.body), u(this._element).on(ve, function (e) {
                i._ignoreBackdropClick ? i._ignoreBackdropClick = !1 : e.target === e.currentTarget && i._triggerBackdropTransition();
            }), n && d.reflow(this._backdrop), u(this._backdrop).addClass(xe), e && (n ? (t = d.getTransitionDurationFromElement(this._backdrop), u(this._backdrop).one(d.TRANSITION_END, e).emulateTransitionEnd(t)) : e())) : !this._isShown && this._backdrop ? (u(this._backdrop).removeClass(xe), n = function n() {
                i._removeBackdrop(), e && e();
            }, u(this._element).hasClass(we) ? (t = d.getTransitionDurationFromElement(this._backdrop), u(this._backdrop).one(d.TRANSITION_END, n).emulateTransitionEnd(t)) : n()) : e && e();
        }, e._adjustDialog = function () {
            var e = this._element.scrollHeight > document.documentElement.clientHeight;!this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px");
        }, e._resetAdjustments = function () {
            this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
        }, e._checkScrollbar = function () {
            var e = document.body.getBoundingClientRect();this._isBodyOverflowing = Math.round(e.left + e.right) < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth();
        }, e._setScrollbar = function () {
            var e,
                t,
                o = this;this._isBodyOverflowing && (e = [].slice.call(document.querySelectorAll(Ce)), t = [].slice.call(document.querySelectorAll(ke)), u(e).each(function (e, t) {
                var i = t.style.paddingRight,
                    n = u(t).css("padding-right");u(t).data("padding-right", i).css("padding-right", parseFloat(n) + o._scrollbarWidth + "px");
            }), u(t).each(function (e, t) {
                var i = t.style.marginRight,
                    n = u(t).css("margin-right");u(t).data("margin-right", i).css("margin-right", parseFloat(n) - o._scrollbarWidth + "px");
            }), e = document.body.style.paddingRight, t = u(document.body).css("padding-right"), u(document.body).data("padding-right", e).css("padding-right", parseFloat(t) + this._scrollbarWidth + "px")), u(document.body).addClass(_e);
        }, e._resetScrollbar = function () {
            var e = [].slice.call(document.querySelectorAll(Ce));u(e).each(function (e, t) {
                var i = u(t).data("padding-right");u(t).removeData("padding-right"), t.style.paddingRight = i || "";
            });e = [].slice.call(document.querySelectorAll(ke));u(e).each(function (e, t) {
                var i = u(t).data("margin-right");void 0 !== i && u(t).css("margin-right", i).removeData("margin-right");
            });e = u(document.body).data("padding-right");u(document.body).removeData("padding-right"), document.body.style.paddingRight = e || "";
        }, e._getScrollbarWidth = function () {
            var e = document.createElement("div");e.className = "modal-scrollbar-measure", document.body.appendChild(e);var t = e.getBoundingClientRect().width - e.clientWidth;return document.body.removeChild(e), t;
        }, o._jQueryInterface = function (i, n) {
            return this.each(function () {
                var e = u(this).data(le),
                    t = a({}, de, u(this).data(), "object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) && i ? i : {});if (e || (e = new o(this, t), u(this).data(le, e)), "string" == typeof i) {
                    if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');e[i](n);
                } else t.show && e.show(n);
            });
        }, s(o, null, [{ key: "VERSION", get: function get() {
                return "4.5.2";
            } }, { key: "Default", get: function get() {
                return de;
            } }]), o;
    }();u(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (e) {
        var t,
            i = this,
            n = d.getSelectorFromElement(this);n && (t = document.querySelector(n));n = u(t).data(le) ? "toggle" : a({}, u(t).data(), u(this).data());"A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();var o = u(t).one(pe, function (e) {
            e.isDefaultPrevented() || o.one(fe, function () {
                u(i).is(":visible") && i.focus();
            });
        });Te._jQueryInterface.call(u(t), n, this);
    }), u.fn[ae] = Te._jQueryInterface, u.fn[ae].Constructor = Te, u.fn[ae].noConflict = function () {
        return u.fn[ae] = ue, Te._jQueryInterface;
    };var Se = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        G = { "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i], a: ["target", "href", "title", "rel"], area: [], b: [], br: [], col: [], code: [], div: [], em: [], hr: [], h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], i: [], img: ["src", "srcset", "alt", "title", "width", "height"], li: [], ol: [], p: [], pre: [], s: [], small: [], span: [], sub: [], sup: [], strong: [], u: [], ul: [] },
        De = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
        Ae = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;function Le(e, r, t) {
        if (0 === e.length) return e;if (t && "function" == typeof t) return t(e);for (var e = new window.DOMParser().parseFromString(e, "text/html"), s = Object.keys(r), a = [].slice.call(e.body.querySelectorAll("*")), i = function i(e, t) {
            var i = a[e],
                n = i.nodeName.toLowerCase();if (-1 === s.indexOf(i.nodeName.toLowerCase())) return i.parentNode.removeChild(i), "continue";var e = [].slice.call(i.attributes),
                o = [].concat(r["*"] || [], r[n] || []);e.forEach(function (e) {
                !function (e, t) {
                    var i = e.nodeName.toLowerCase();if (-1 !== t.indexOf(i)) return -1 === Se.indexOf(i) || Boolean(e.nodeValue.match(De) || e.nodeValue.match(Ae));for (var n = t.filter(function (e) {
                        return e instanceof RegExp;
                    }), o = 0, r = n.length; o < r; o++) {
                        if (i.match(n[o])) return 1;
                    }
                }(e, o) && i.removeAttribute(e.nodeName);
            });
        }, n = 0, o = a.length; n < o; n++) {
            i(n);
        }return e.body.innerHTML;
    }var Ne = "tooltip",
        Ie = "bs.tooltip",
        Pe = "." + Ie,
        je = u.fn[Ne],
        Oe = "bs-tooltip",
        Re = new RegExp("(^|\\s)" + Oe + "\\S+", "g"),
        qe = ["sanitize", "whiteList", "sanitizeFn"],
        Fe = { animation: "boolean", template: "string", title: "(string|element|function)", trigger: "string", delay: "(number|object)", html: "boolean", selector: "(string|boolean)", placement: "(string|function)", offset: "(number|string|function)", container: "(string|element|boolean)", fallbackPlacement: "(string|array)", boundary: "(string|element)", sanitize: "boolean", sanitizeFn: "(null|function)", whiteList: "object", popperConfig: "(null|object)" },
        Me = { AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left" },
        He = { animation: !0, template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, selector: !1, placement: "top", offset: 0, container: !1, fallbackPlacement: "flip", boundary: "scrollParent", sanitize: !0, sanitizeFn: null, whiteList: G, popperConfig: null },
        ze = "show",
        Be = { HIDE: "hide" + Pe, HIDDEN: "hidden" + Pe, SHOW: "show" + Pe, SHOWN: "shown" + Pe, INSERTED: "inserted" + Pe, CLICK: "click" + Pe, FOCUSIN: "focusin" + Pe, FOCUSOUT: "focusout" + Pe, MOUSEENTER: "mouseenter" + Pe, MOUSELEAVE: "mouseleave" + Pe },
        We = "fade",
        Ue = "show",
        $e = "hover",
        Ve = "focus",
        Qe = function () {
        function n(e, t) {
            if (void 0 === o) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners();
        }var e = n.prototype;return e.enable = function () {
            this._isEnabled = !0;
        }, e.disable = function () {
            this._isEnabled = !1;
        }, e.toggleEnabled = function () {
            this._isEnabled = !this._isEnabled;
        }, e.toggle = function (e) {
            var t, i;this._isEnabled && (e ? (t = this.constructor.DATA_KEY, (i = u(e.currentTarget).data(t)) || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), u(e.currentTarget).data(t, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)) : u(this.getTipElement()).hasClass(Ue) ? this._leave(null, this) : this._enter(null, this));
        }, e.dispose = function () {
            clearTimeout(this._timeout), u.removeData(this.element, this.constructor.DATA_KEY), u(this.element).off(this.constructor.EVENT_KEY), u(this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler), this.tip && u(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null;
        }, e.show = function () {
            var t = this;if ("none" === u(this.element).css("display")) throw new Error("Please use show on visible elements");var e,
                i,
                n = u.Event(this.constructor.Event.SHOW);this.isWithContent() && this._isEnabled && (u(this.element).trigger(n), i = d.findShadowRoot(this.element), e = u.contains(null !== i ? i : this.element.ownerDocument.documentElement, this.element), !n.isDefaultPrevented() && e && (i = this.getTipElement(), n = d.getUID(this.constructor.NAME), i.setAttribute("id", n), this.element.setAttribute("aria-describedby", n), this.setContent(), this.config.animation && u(i).addClass(We), e = "function" == typeof this.config.placement ? this.config.placement.call(this, i, this.element) : this.config.placement, n = this._getAttachment(e), this.addAttachmentClass(n), e = this._getContainer(), u(i).data(this.constructor.DATA_KEY, this), u.contains(this.element.ownerDocument.documentElement, this.tip) || u(i).appendTo(e), u(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new o(this.element, i, this._getPopperConfig(n)), u(i).addClass(Ue), "ontouchstart" in document.documentElement && u(document.body).children().on("mouseover", null, u.noop), n = function n() {
                t.config.animation && t._fixTransition();var e = t._hoverState;t._hoverState = null, u(t.element).trigger(t.constructor.Event.SHOWN), "out" === e && t._leave(null, t);
            }, u(this.tip).hasClass(We) ? (i = d.getTransitionDurationFromElement(this.tip), u(this.tip).one(d.TRANSITION_END, n).emulateTransitionEnd(i)) : n()));
        }, e.hide = function (e) {
            function t() {
                i._hoverState !== ze && n.parentNode && n.parentNode.removeChild(n), i._cleanTipClass(), i.element.removeAttribute("aria-describedby"), u(i.element).trigger(i.constructor.Event.HIDDEN), null !== i._popper && i._popper.destroy(), e && e();
            }var i = this,
                n = this.getTipElement(),
                o = u.Event(this.constructor.Event.HIDE);u(this.element).trigger(o), o.isDefaultPrevented() || (u(n).removeClass(Ue), "ontouchstart" in document.documentElement && u(document.body).children().off("mouseover", null, u.noop), this._activeTrigger.click = !1, this._activeTrigger[Ve] = !1, this._activeTrigger[$e] = !1, u(this.tip).hasClass(We) ? (o = d.getTransitionDurationFromElement(n), u(n).one(d.TRANSITION_END, t).emulateTransitionEnd(o)) : t(), this._hoverState = "");
        }, e.update = function () {
            null !== this._popper && this._popper.scheduleUpdate();
        }, e.isWithContent = function () {
            return Boolean(this.getTitle());
        }, e.addAttachmentClass = function (e) {
            u(this.getTipElement()).addClass(Oe + "-" + e);
        }, e.getTipElement = function () {
            return this.tip = this.tip || u(this.config.template)[0], this.tip;
        }, e.setContent = function () {
            var e = this.getTipElement();this.setElementContent(u(e.querySelectorAll(".tooltip-inner")), this.getTitle()), u(e).removeClass(We + " " + Ue);
        }, e.setElementContent = function (e, t) {
            "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) || !t.nodeType && !t.jquery ? this.config.html ? (this.config.sanitize && (t = Le(t, this.config.whiteList, this.config.sanitizeFn)), e.html(t)) : e.text(t) : this.config.html ? u(t).parent().is(e) || e.empty().append(t) : e.text(u(t).text());
        }, e.getTitle = function () {
            return this.element.getAttribute("data-original-title") || ("function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title);
        }, e._getPopperConfig = function (e) {
            var t = this;return a({}, { placement: e, modifiers: { offset: this._getOffset(), flip: { behavior: this.config.fallbackPlacement }, arrow: { element: ".arrow" }, preventOverflow: { boundariesElement: this.config.boundary } }, onCreate: function onCreate(e) {
                    e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e);
                }, onUpdate: function onUpdate(e) {
                    return t._handlePopperPlacementChange(e);
                } }, this.config.popperConfig);
        }, e._getOffset = function () {
            var t = this,
                e = {};return "function" == typeof this.config.offset ? e.fn = function (e) {
                return e.offsets = a({}, e.offsets, t.config.offset(e.offsets, t.element) || {}), e;
            } : e.offset = this.config.offset, e;
        }, e._getContainer = function () {
            return !1 === this.config.container ? document.body : d.isElement(this.config.container) ? u(this.config.container) : u(document).find(this.config.container);
        }, e._getAttachment = function (e) {
            return Me[e.toUpperCase()];
        }, e._setListeners = function () {
            var i = this;this.config.trigger.split(" ").forEach(function (e) {
                var t;"click" === e ? u(i.element).on(i.constructor.Event.CLICK, i.config.selector, function (e) {
                    return i.toggle(e);
                }) : "manual" !== e && (t = e === $e ? i.constructor.Event.MOUSEENTER : i.constructor.Event.FOCUSIN, e = e === $e ? i.constructor.Event.MOUSELEAVE : i.constructor.Event.FOCUSOUT, u(i.element).on(t, i.config.selector, function (e) {
                    return i._enter(e);
                }).on(e, i.config.selector, function (e) {
                    return i._leave(e);
                }));
            }), this._hideModalHandler = function () {
                i.element && i.hide();
            }, u(this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler), this.config.selector ? this.config = a({}, this.config, { trigger: "manual", selector: "" }) : this._fixTitle();
        }, e._fixTitle = function () {
            var e = _typeof(this.element.getAttribute("data-original-title"));!this.element.getAttribute("title") && "string" == e || (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
        }, e._enter = function (e, t) {
            var i = this.constructor.DATA_KEY;(t = t || u(e.currentTarget).data(i)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), u(e.currentTarget).data(i, t)), e && (t._activeTrigger["focusin" === e.type ? Ve : $e] = !0), u(t.getTipElement()).hasClass(Ue) || t._hoverState === ze ? t._hoverState = ze : (clearTimeout(t._timeout), t._hoverState = ze, t.config.delay && t.config.delay.show ? t._timeout = setTimeout(function () {
                t._hoverState === ze && t.show();
            }, t.config.delay.show) : t.show());
        }, e._leave = function (e, t) {
            var i = this.constructor.DATA_KEY;(t = t || u(e.currentTarget).data(i)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), u(e.currentTarget).data(i, t)), e && (t._activeTrigger["focusout" === e.type ? Ve : $e] = !1), t._isWithActiveTrigger() || (clearTimeout(t._timeout), t._hoverState = "out", t.config.delay && t.config.delay.hide ? t._timeout = setTimeout(function () {
                "out" === t._hoverState && t.hide();
            }, t.config.delay.hide) : t.hide());
        }, e._isWithActiveTrigger = function () {
            for (var e in this._activeTrigger) {
                if (this._activeTrigger[e]) return !0;
            }return !1;
        }, e._getConfig = function (e) {
            var t = u(this.element).data();return Object.keys(t).forEach(function (e) {
                -1 !== qe.indexOf(e) && delete t[e];
            }), "number" == typeof (e = a({}, this.constructor.Default, t, "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e ? e : {})).delay && (e.delay = { show: e.delay, hide: e.delay }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), d.typeCheckConfig(Ne, e, this.constructor.DefaultType), e.sanitize && (e.template = Le(e.template, e.whiteList, e.sanitizeFn)), e;
        }, e._getDelegateConfig = function () {
            var e = {};if (this.config) for (var t in this.config) {
                this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
            }return e;
        }, e._cleanTipClass = function () {
            var e = u(this.getTipElement()),
                t = e.attr("class").match(Re);null !== t && t.length && e.removeClass(t.join(""));
        }, e._handlePopperPlacementChange = function (e) {
            this.tip = e.instance.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement));
        }, e._fixTransition = function () {
            var e = this.getTipElement(),
                t = this.config.animation;null === e.getAttribute("x-placement") && (u(e).removeClass(We), this.config.animation = !1, this.hide(), this.show(), this.config.animation = t);
        }, n._jQueryInterface = function (i) {
            return this.each(function () {
                var e = u(this).data(Ie),
                    t = "object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) && i;if ((e || !/dispose|hide/.test(i)) && (e || (e = new n(this, t), u(this).data(Ie, e)), "string" == typeof i)) {
                    if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');e[i]();
                }
            });
        }, s(n, null, [{ key: "VERSION", get: function get() {
                return "4.5.2";
            } }, { key: "Default", get: function get() {
                return He;
            } }, { key: "NAME", get: function get() {
                return Ne;
            } }, { key: "DATA_KEY", get: function get() {
                return Ie;
            } }, { key: "Event", get: function get() {
                return Be;
            } }, { key: "EVENT_KEY", get: function get() {
                return Pe;
            } }, { key: "DefaultType", get: function get() {
                return Fe;
            } }]), n;
    }();u.fn[Ne] = Qe._jQueryInterface, u.fn[Ne].Constructor = Qe, u.fn[Ne].noConflict = function () {
        return u.fn[Ne] = je, Qe._jQueryInterface;
    };var Xe = "popover",
        Ye = "bs.popover",
        Ke = "." + Ye,
        Ge = u.fn[Xe],
        Je = "bs-popover",
        Ze = new RegExp("(^|\\s)" + Je + "\\S+", "g"),
        et = a({}, Qe.Default, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>' }),
        tt = a({}, Qe.DefaultType, { content: "(string|element|function)" }),
        it = { HIDE: "hide" + Ke, HIDDEN: "hidden" + Ke, SHOW: "show" + Ke, SHOWN: "shown" + Ke, INSERTED: "inserted" + Ke, CLICK: "click" + Ke, FOCUSIN: "focusin" + Ke, FOCUSOUT: "focusout" + Ke, MOUSEENTER: "mouseenter" + Ke, MOUSELEAVE: "mouseleave" + Ke },
        nt = function (e) {
        var t;function n() {
            return e.apply(this, arguments) || this;
        }i = e, (t = n).prototype = Object.create(i.prototype), (t.prototype.constructor = t).__proto__ = i;var i = n.prototype;return i.isWithContent = function () {
            return this.getTitle() || this._getContent();
        }, i.addAttachmentClass = function (e) {
            u(this.getTipElement()).addClass(Je + "-" + e);
        }, i.getTipElement = function () {
            return this.tip = this.tip || u(this.config.template)[0], this.tip;
        }, i.setContent = function () {
            var e = u(this.getTipElement());this.setElementContent(e.find(".popover-header"), this.getTitle());var t = this._getContent();"function" == typeof t && (t = t.call(this.element)), this.setElementContent(e.find(".popover-body"), t), e.removeClass("fade show");
        }, i._getContent = function () {
            return this.element.getAttribute("data-content") || this.config.content;
        }, i._cleanTipClass = function () {
            var e = u(this.getTipElement()),
                t = e.attr("class").match(Ze);null !== t && 0 < t.length && e.removeClass(t.join(""));
        }, n._jQueryInterface = function (i) {
            return this.each(function () {
                var e = u(this).data(Ye),
                    t = "object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) ? i : null;if ((e || !/dispose|hide/.test(i)) && (e || (e = new n(this, t), u(this).data(Ye, e)), "string" == typeof i)) {
                    if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');e[i]();
                }
            });
        }, s(n, null, [{ key: "VERSION", get: function get() {
                return "4.5.2";
            } }, { key: "Default", get: function get() {
                return et;
            } }, { key: "NAME", get: function get() {
                return Xe;
            } }, { key: "DATA_KEY", get: function get() {
                return Ye;
            } }, { key: "Event", get: function get() {
                return it;
            } }, { key: "EVENT_KEY", get: function get() {
                return Ke;
            } }, { key: "DefaultType", get: function get() {
                return tt;
            } }]), n;
    }(Qe);u.fn[Xe] = nt._jQueryInterface, u.fn[Xe].Constructor = nt, u.fn[Xe].noConflict = function () {
        return u.fn[Xe] = Ge, nt._jQueryInterface;
    };var ot = "scrollspy",
        rt = "bs.scrollspy",
        st = "." + rt,
        at = u.fn[ot],
        lt = { offset: 10, method: "auto", target: "" },
        ct = { offset: "number", method: "string", target: "(string|element)" },
        ut = "active",
        dt = ".nav, .list-group",
        ht = ".nav-link",
        ft = ".list-group-item",
        pt = "position",
        mt = function () {
        function i(e, t) {
            var i = this;this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(t), this._selector = this._config.target + " " + ht + "," + this._config.target + " " + ft + "," + this._config.target + " .dropdown-item", this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, u(this._scrollElement).on("scroll.bs.scrollspy", function (e) {
                return i._process(e);
            }), this.refresh(), this._process();
        }var e = i.prototype;return e.refresh = function () {
            var t = this,
                e = this._scrollElement === this._scrollElement.window ? "offset" : pt,
                n = "auto" === this._config.method ? e : this._config.method,
                o = n === pt ? this._getScrollTop() : 0;this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function (e) {
                var t,
                    i = d.getSelectorFromElement(e);if (t = i ? document.querySelector(i) : t) {
                    e = t.getBoundingClientRect();if (e.width || e.height) return [u(t)[n]().top + o, i];
                }return null;
            }).filter(function (e) {
                return e;
            }).sort(function (e, t) {
                return e[0] - t[0];
            }).forEach(function (e) {
                t._offsets.push(e[0]), t._targets.push(e[1]);
            });
        }, e.dispose = function () {
            u.removeData(this._element, rt), u(this._scrollElement).off(st), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null;
        }, e._getConfig = function (e) {
            var t;return "string" != typeof (e = a({}, lt, "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e ? e : {})).target && d.isElement(e.target) && ((t = u(e.target).attr("id")) || (t = d.getUID(ot), u(e.target).attr("id", t)), e.target = "#" + t), d.typeCheckConfig(ot, e, ct), e;
        }, e._getScrollTop = function () {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
        }, e._getScrollHeight = function () {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        }, e._getOffsetHeight = function () {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
        }, e._process = function () {
            var e = this._getScrollTop() + this._config.offset,
                t = this._getScrollHeight(),
                i = this._config.offset + t - this._getOffsetHeight();if (this._scrollHeight !== t && this.refresh(), i <= e) {
                i = this._targets[this._targets.length - 1];this._activeTarget !== i && this._activate(i);
            } else {
                if (this._activeTarget && e < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();for (var n = this._offsets.length; n--;) {
                    this._activeTarget !== this._targets[n] && e >= this._offsets[n] && (void 0 === this._offsets[n + 1] || e < this._offsets[n + 1]) && this._activate(this._targets[n]);
                }
            }
        }, e._activate = function (t) {
            this._activeTarget = t, this._clear();var e = this._selector.split(",").map(function (e) {
                return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]';
            }),
                e = u([].slice.call(document.querySelectorAll(e.join(","))));e.hasClass("dropdown-item") ? (e.closest(".dropdown").find(".dropdown-toggle").addClass(ut), e.addClass(ut)) : (e.addClass(ut), e.parents(dt).prev(ht + ", " + ft).addClass(ut), e.parents(dt).prev(".nav-item").children(ht).addClass(ut)), u(this._scrollElement).trigger("activate.bs.scrollspy", { relatedTarget: t });
        }, e._clear = function () {
            [].slice.call(document.querySelectorAll(this._selector)).filter(function (e) {
                return e.classList.contains(ut);
            }).forEach(function (e) {
                return e.classList.remove(ut);
            });
        }, i._jQueryInterface = function (t) {
            return this.each(function () {
                var e = u(this).data(rt);if (e || (e = new i(this, "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t), u(this).data(rt, e)), "string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError('No method named "' + t + '"');e[t]();
                }
            });
        }, s(i, null, [{ key: "VERSION", get: function get() {
                return "4.5.2";
            } }, { key: "Default", get: function get() {
                return lt;
            } }]), i;
    }();u(window).on("load.bs.scrollspy.data-api", function () {
        for (var e = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), t = e.length; t--;) {
            var i = u(e[t]);mt._jQueryInterface.call(i, i.data());
        }
    }), u.fn[ot] = mt._jQueryInterface, u.fn[ot].Constructor = mt, u.fn[ot].noConflict = function () {
        return u.fn[ot] = at, mt._jQueryInterface;
    };var gt = "bs.tab",
        vt = u.fn.tab,
        yt = "active",
        bt = ".active",
        _t = "> li > .active",
        wt = function () {
        function n(e) {
            this._element = e;
        }var e = n.prototype;return e.show = function () {
            var e,
                t,
                i,
                n,
                o,
                r,
                s = this;this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && u(this._element).hasClass(yt) || u(this._element).hasClass("disabled") || (r = u(this._element).closest(".nav, .list-group")[0], t = d.getSelectorFromElement(this._element), r && (o = "UL" === r.nodeName || "OL" === r.nodeName ? _t : bt, i = (i = u.makeArray(u(r).find(o)))[i.length - 1]), n = u.Event("hide.bs.tab", { relatedTarget: this._element }), o = u.Event("show.bs.tab", { relatedTarget: i }), i && u(i).trigger(n), u(this._element).trigger(o), o.isDefaultPrevented() || n.isDefaultPrevented() || (t && (e = document.querySelector(t)), this._activate(this._element, r), r = function r() {
                var e = u.Event("hidden.bs.tab", { relatedTarget: s._element }),
                    t = u.Event("shown.bs.tab", { relatedTarget: i });u(i).trigger(e), u(s._element).trigger(t);
            }, e ? this._activate(e, e.parentNode, r) : r()));
        }, e.dispose = function () {
            u.removeData(this._element, gt), this._element = null;
        }, e._activate = function (e, t, i) {
            var n = this,
                o = (!t || "UL" !== t.nodeName && "OL" !== t.nodeName ? u(t).children(bt) : u(t).find(_t))[0],
                r = i && o && u(o).hasClass("fade"),
                t = function t() {
                return n._transitionComplete(e, o, i);
            };o && r ? (r = d.getTransitionDurationFromElement(o), u(o).removeClass("show").one(d.TRANSITION_END, t).emulateTransitionEnd(r)) : t();
        }, e._transitionComplete = function (e, t, i) {
            var n;t && (u(t).removeClass(yt), (n = u(t.parentNode).find("> .dropdown-menu .active")[0]) && u(n).removeClass(yt), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !1)), u(e).addClass(yt), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), d.reflow(e), e.classList.contains("fade") && e.classList.add("show"), e.parentNode && u(e.parentNode).hasClass("dropdown-menu") && ((t = u(e).closest(".dropdown")[0]) && (t = [].slice.call(t.querySelectorAll(".dropdown-toggle")), u(t).addClass(yt)), e.setAttribute("aria-expanded", !0)), i && i();
        }, n._jQueryInterface = function (i) {
            return this.each(function () {
                var e = u(this),
                    t = e.data(gt);if (t || (t = new n(this), e.data(gt, t)), "string" == typeof i) {
                    if (void 0 === t[i]) throw new TypeError('No method named "' + i + '"');t[i]();
                }
            });
        }, s(n, null, [{ key: "VERSION", get: function get() {
                return "4.5.2";
            } }]), n;
    }();u(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function (e) {
        e.preventDefault(), wt._jQueryInterface.call(u(this), "show");
    }), u.fn.tab = wt._jQueryInterface, u.fn.tab.Constructor = wt, u.fn.tab.noConflict = function () {
        return u.fn.tab = vt, wt._jQueryInterface;
    };var xt = "toast",
        Et = "bs.toast",
        G = "." + Et,
        Ct = u.fn[xt],
        kt = "click.dismiss" + G,
        Tt = "show",
        St = "showing",
        Dt = { animation: "boolean", autohide: "boolean", delay: "number" },
        At = { animation: !0, autohide: !0, delay: 500 },
        Lt = function () {
        function n(e, t) {
            this._element = e, this._config = this._getConfig(t), this._timeout = null, this._setListeners();
        }var e = n.prototype;return e.show = function () {
            var e,
                t = this,
                i = u.Event("show.bs.toast");u(this._element).trigger(i), i.isDefaultPrevented() || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), e = function e() {
                t._element.classList.remove(St), t._element.classList.add(Tt), u(t._element).trigger("shown.bs.toast"), t._config.autohide && (t._timeout = setTimeout(function () {
                    t.hide();
                }, t._config.delay));
            }, this._element.classList.remove("hide"), d.reflow(this._element), this._element.classList.add(St), this._config.animation ? (i = d.getTransitionDurationFromElement(this._element), u(this._element).one(d.TRANSITION_END, e).emulateTransitionEnd(i)) : e());
        }, e.hide = function () {
            var e;this._element.classList.contains(Tt) && (e = u.Event("hide.bs.toast"), u(this._element).trigger(e), e.isDefaultPrevented() || this._close());
        }, e.dispose = function () {
            this._clearTimeout(), this._element.classList.contains(Tt) && this._element.classList.remove(Tt), u(this._element).off(kt), u.removeData(this._element, Et), this._element = null, this._config = null;
        }, e._getConfig = function (e) {
            return e = a({}, At, u(this._element).data(), "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e ? e : {}), d.typeCheckConfig(xt, e, this.constructor.DefaultType), e;
        }, e._setListeners = function () {
            var e = this;u(this._element).on(kt, '[data-dismiss="toast"]', function () {
                return e.hide();
            });
        }, e._close = function () {
            function e() {
                i._element.classList.add("hide"), u(i._element).trigger("hidden.bs.toast");
            }var t,
                i = this;this._element.classList.remove(Tt), this._config.animation ? (t = d.getTransitionDurationFromElement(this._element), u(this._element).one(d.TRANSITION_END, e).emulateTransitionEnd(t)) : e();
        }, e._clearTimeout = function () {
            clearTimeout(this._timeout), this._timeout = null;
        }, n._jQueryInterface = function (i) {
            return this.each(function () {
                var e = u(this),
                    t = e.data(Et);if (t || (t = new n(this, "object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) && i), e.data(Et, t)), "string" == typeof i) {
                    if (void 0 === t[i]) throw new TypeError('No method named "' + i + '"');t[i](this);
                }
            });
        }, s(n, null, [{ key: "VERSION", get: function get() {
                return "4.5.2";
            } }, { key: "DefaultType", get: function get() {
                return Dt;
            } }, { key: "Default", get: function get() {
                return At;
            } }]), n;
    }();u.fn[xt] = Lt._jQueryInterface, u.fn[xt].Constructor = Lt, u.fn[xt].noConflict = function () {
        return u.fn[xt] = Ct, Lt._jQueryInterface;
    }, e.Alert = h, e.Button = b, e.Carousel = I, e.Collapse = W, e.Dropdown = se, e.Modal = Te, e.Popover = nt, e.Scrollspy = mt, e.Tab = wt, e.Toast = Lt, e.Tooltip = Qe, e.Util = d, Object.defineProperty(e, "__esModule", { value: !0 });
}), function (a) {
    "use strict";
    function l(e) {
        return e.is('[type="checkbox"]') ? e.prop("checked") : e.is('[type="radio"]') ? !!a('[name="' + e.attr("name") + '"]:checked').length : a.trim(e.val());
    }function s(e, t) {
        for (var i in this.options = t, this.$element = a(e), this.$inputs = this.$element.find(s.INPUT_SELECTOR), this.$btn = a('button[type="submit"], input[type="submit"]').filter('[form="' + this.$element.attr("id") + '"]').add(this.$element.find('input[type="submit"], button[type="submit"]')), t.errors = a.extend({}, s.DEFAULTS.errors, t.errors), t.custom) {
            if (!t.errors[i]) throw new Error("Missing default error message for custom validator: " + i);
        }a.extend(s.VALIDATORS, t.custom), this.$element.attr("novalidate", !0), this.toggleSubmit(), this.$element.on("input.bs.validator change.bs.validator focusout.bs.validator", s.INPUT_SELECTOR, a.proxy(this.onInput, this)), this.$element.on("submit.bs.validator", a.proxy(this.onSubmit, this)), this.$element.find("[data-match]").each(function () {
            var t = a(this),
                e = t.data("match");a(e).on("input.bs.validator", function (e) {
                l(t) && t.trigger("input.bs.validator");
            });
        });
    }function t(n) {
        return this.each(function () {
            var e = a(this),
                t = a.extend({}, s.DEFAULTS, e.data(), "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) && n),
                i = e.data("bs.validator");!i && "destroy" == n || (i || e.data("bs.validator", i = new s(this, t)), "string" == typeof n && i[n]());
        });
    }s.INPUT_SELECTOR = ':input:not([type="submit"], button):enabled:visible', s.FOCUS_OFFSET = 20, s.DEFAULTS = { delay: 500, html: !1, disable: !0, focus: !0, custom: {}, errors: { match: "Does not match", minlength: "Not long enough" }, feedback: { success: "glyphicon-ok", error: "glyphicon-remove" } }, s.VALIDATORS = { native: function native(e) {
            e = e[0];return !e.checkValidity || e.checkValidity();
        }, match: function match(e) {
            var t = e.data("match");return !e.val() || e.val() === a(t).val();
        }, minlength: function minlength(e) {
            var t = e.data("minlength");return !e.val() || e.val().length >= t;
        } }, s.prototype.onInput = function (e) {
        var t = this,
            i = a(e.target),
            e = "focusout" !== e.type;this.validateInput(i, e).done(function () {
            t.toggleSubmit();
        });
    }, s.prototype.validateInput = function (t, i) {
        var e = l(t),
            n = t.data("bs.validator.previous"),
            o = t.data("bs.validator.errors");if (n === e) return a.Deferred().resolve();t.data("bs.validator.previous", e), t.is('[type="radio"]') && (t = this.$element.find('input[name="' + t.attr("name") + '"]'));var r = a.Event("validate.bs.validator", { relatedTarget: t[0] });if (this.$element.trigger(r), !r.isDefaultPrevented()) {
            var s = this;return this.runValidators(t).done(function (e) {
                t.data("bs.validator.errors", e), e.length ? i ? s.defer(t, s.showErrors) : s.showErrors(t) : s.clearErrors(t), o && e.toString() === o.toString() || (r = e.length ? a.Event("invalid.bs.validator", { relatedTarget: t[0], detail: e }) : a.Event("valid.bs.validator", { relatedTarget: t[0], detail: o }), s.$element.trigger(r)), s.toggleSubmit(), s.$element.trigger(a.Event("validated.bs.validator", { relatedTarget: t[0] }));
            });
        }
    }, s.prototype.runValidators = function (i) {
        var n = [],
            t = a.Deferred(),
            o = this.options;function r(e) {
            return i.data(e + "-error") || i.data("error") || "native" == e && i[0].validationMessage || o.errors[e];
        }return i.data("bs.validator.deferred") && i.data("bs.validator.deferred").reject(), i.data("bs.validator.deferred", t), a.each(s.VALIDATORS, a.proxy(function (e, t) {
            !l(i) && !i.attr("required") || !i.data(e) && "native" != e || t.call(this, i) || (e = r(e), ~n.indexOf(e) || n.push(e));
        }, this)), !n.length && l(i) && i.data("remote") ? this.defer(i, function () {
            var e = {};e[i.attr("name")] = l(i), a.get(i.data("remote"), e).fail(function (e, t, i) {
                n.push(r("remote") || i);
            }).always(function () {
                t.resolve(n);
            });
        }) : t.resolve(n), t.promise();
    }, s.prototype.validate = function () {
        var t = this;return a.when(this.$inputs.map(function (e) {
            return t.validateInput(a(this), !1);
        })).then(function () {
            t.toggleSubmit(), t.focusError();
        }), this;
    }, s.prototype.focusError = function () {
        var e;!this.options.focus || 0 !== (e = a(".has-error:first :input")).length && (a(document.body).animate({ scrollTop: e.offset().top - s.FOCUS_OFFSET }, 250), e.focus());
    }, s.prototype.showErrors = function (e) {
        var t = this.options.html ? "html" : "text",
            i = e.data("bs.validator.errors"),
            n = e.closest(".form-group"),
            o = n.find(".help-block.with-errors"),
            e = n.find(".form-control-feedback");i.length && (i = a("<ul/>").addClass("list-unstyled").append(a.map(i, function (e) {
            return a("<li/>")[t](e);
        })), void 0 === o.data("bs.validator.originalContent") && o.data("bs.validator.originalContent", o.html()), o.empty().append(i), n.addClass("has-error has-danger"), n.hasClass("has-feedback") && e.removeClass(this.options.feedback.success) && e.addClass(this.options.feedback.error) && n.removeClass("has-success"));
    }, s.prototype.clearErrors = function (e) {
        var t = e.closest(".form-group"),
            i = t.find(".help-block.with-errors"),
            n = t.find(".form-control-feedback");i.html(i.data("bs.validator.originalContent")), t.removeClass("has-error has-danger"), t.hasClass("has-feedback") && n.removeClass(this.options.feedback.error) && l(e) && n.addClass(this.options.feedback.success) && t.addClass("has-success");
    }, s.prototype.hasErrors = function () {
        return !!this.$inputs.filter(function () {
            return !!(a(this).data("bs.validator.errors") || []).length;
        }).length;
    }, s.prototype.isIncomplete = function () {
        return !!this.$inputs.filter("[required]").filter(function () {
            return !l(a(this));
        }).length;
    }, s.prototype.onSubmit = function (e) {
        this.validate(), (this.isIncomplete() || this.hasErrors()) && e.preventDefault();
    }, s.prototype.toggleSubmit = function () {
        this.options.disable && this.$btn.toggleClass("disabled", this.isIncomplete() || this.hasErrors());
    }, s.prototype.defer = function (e, t) {
        if (t = a.proxy(t, this, e), !this.options.delay) return t();window.clearTimeout(e.data("bs.validator.timeout")), e.data("bs.validator.timeout", window.setTimeout(t, this.options.delay));
    }, s.prototype.destroy = function () {
        return this.$element.removeAttr("novalidate").removeData("bs.validator").off(".bs.validator").find(".form-control-feedback").removeClass([this.options.feedback.error, this.options.feedback.success].join(" ")), this.$inputs.off(".bs.validator").removeData(["bs.validator.errors", "bs.validator.deferred", "bs.validator.previous"]).each(function () {
            var e = a(this),
                t = e.data("bs.validator.timeout");window.clearTimeout(t) && e.removeData("bs.validator.timeout");
        }), this.$element.find(".help-block.with-errors").each(function () {
            var e = a(this),
                t = e.data("bs.validator.originalContent");e.removeData("bs.validator.originalContent").html(t);
        }), this.$element.find('input[type="submit"], button[type="submit"]').removeClass("disabled"), this.$element.find(".has-error, .has-danger").removeClass("has-error has-danger"), this;
    };var e = a.fn.validator;a.fn.validator = t, a.fn.validator.Constructor = s, a.fn.validator.noConflict = function () {
        return a.fn.validator = e, this;
    }, a(window).on("load", function () {
        a('form[data-toggle="validator"]').each(function () {
            var e = a(this);t.call(e, e.data());
        });
    });
}(jQuery), function (t, i) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (e) {
        return i(t, e);
    }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = i(t, require("jquery")) : t.jQueryBridget = i(t, t.jQuery);
}(window, function (e, t) {
    "use strict";
    var i = Array.prototype.slice,
        n = e.console,
        d = void 0 === n ? function () {} : function (e) {
        n.error(e);
    };function o(l, c, u) {
        (u = u || t || e.jQuery) && (c.prototype.option || (c.prototype.option = function (e) {
            u.isPlainObject(e) && (this.options = u.extend(!0, this.options, e));
        }), u.fn[l] = function (e) {
            if ("string" != typeof e) return a = e, this.each(function (e, t) {
                var i = u.data(t, l);i ? (i.option(a), i._init()) : (i = new c(t, a), u.data(t, l, i));
            }), this;var n,
                o,
                r,
                s,
                a,
                t = i.call(arguments, 1);return o = t, s = "$()." + l + '("' + (n = e) + '")', (e = this).each(function (e, t) {
                var i = u.data(t, l);i ? (t = i[n]) && "_" != n.charAt(0) ? (i = t.apply(i, o), r = void 0 === r ? i : r) : d(s + " is not a valid method") : d(l + " not initialized. Cannot call methods, i.e. " + s);
            }), void 0 !== r ? r : e;
        }, r(u));
    }function r(e) {
        e && !e.bridget && (e.bridget = o);
    }return r(t || e.jQuery), o;
}), function (e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = t() : e.EvEmitter = t();
}("undefined" != typeof window ? window : this, function () {
    function e() {}var t = e.prototype;return t.on = function (e, t) {
        if (e && t) {
            var i = this._events = this._events || {},
                e = i[e] = i[e] || [];return -1 == e.indexOf(t) && e.push(t), this;
        }
    }, t.once = function (e, t) {
        if (e && t) {
            this.on(e, t);var i = this._onceEvents = this._onceEvents || {};return (i[e] = i[e] || {})[t] = !0, this;
        }
    }, t.off = function (e, t) {
        e = this._events && this._events[e];if (e && e.length) {
            t = e.indexOf(t);return -1 != t && e.splice(t, 1), this;
        }
    }, t.emitEvent = function (e, t) {
        var i = this._events && this._events[e];if (i && i.length) {
            i = i.slice(0), t = t || [];for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
                var r = i[o];n && n[r] && (this.off(e, r), delete n[r]), r.apply(this, t);
            }return this;
        }
    }, t.allOff = function () {
        delete this._events, delete this._onceEvents;
    }, e;
}), function (e, t) {
    "function" == typeof define && define.amd ? define("get-size/get-size", t) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = t() : e.getSize = t();
}(window, function () {
    "use strict";
    function f(e) {
        var t = parseFloat(e);return -1 == e.indexOf("%") && !isNaN(t) && t;
    }var t = "undefined" == typeof console ? function () {} : function (e) {
        console.error(e);
    },
        p = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        m = p.length;function g(e) {
        e = getComputedStyle(e);return e || t("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e;
    }var v,
        y = !1;function b(e) {
        if (y || (y = !0, (h = document.createElement("div")).style.width = "200px", h.style.padding = "1px 2px 3px 4px", h.style.borderStyle = "solid", h.style.borderWidth = "1px 2px 3px 4px", h.style.boxSizing = "border-box", (d = document.body || document.documentElement).appendChild(h), u = g(h), v = 200 == Math.round(f(u.width)), b.isBoxSizeOuter = v, d.removeChild(h)), (e = "string" == typeof e ? document.querySelector(e) : e) && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e.nodeType) {
            var t = g(e);if ("none" == t.display) return function () {
                for (var e = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, t = 0; t < m; t++) {
                    e[p[t]] = 0;
                }return e;
            }();var i = {};i.width = e.offsetWidth, i.height = e.offsetHeight;for (var n = i.isBorderBox = "border-box" == t.boxSizing, o = 0; o < m; o++) {
                var r = p[o],
                    s = t[r],
                    s = parseFloat(s);i[r] = isNaN(s) ? 0 : s;
            }var a = i.paddingLeft + i.paddingRight,
                l = i.paddingTop + i.paddingBottom,
                c = i.marginLeft + i.marginRight,
                u = i.marginTop + i.marginBottom,
                d = i.borderLeftWidth + i.borderRightWidth,
                h = i.borderTopWidth + i.borderBottomWidth,
                e = n && v,
                n = f(t.width);!1 !== n && (i.width = n + (e ? 0 : a + d));n = f(t.height);return !1 !== n && (i.height = n + (e ? 0 : l + h)), i.innerWidth = i.width - (a + d), i.innerHeight = i.height - (l + h), i.outerWidth = i.width + c, i.outerHeight = i.height + u, i;
        }
    }return b;
}), function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", t) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = t() : e.matchesSelector = t();
}(window, function () {
    "use strict";
    var i = function () {
        var e = window.Element.prototype;if (e.matches) return "matches";if (e.matchesSelector) return "matchesSelector";for (var t = ["webkit", "moz", "ms", "o"], i = 0; i < t.length; i++) {
            var n = t[i] + "MatchesSelector";if (e[n]) return n;
        }
    }();return function (e, t) {
        return e[i](t);
    };
}), function (t, i) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (e) {
        return i(t, e);
    }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = i(t, require("desandro-matches-selector")) : t.fizzyUIUtils = i(t, t.matchesSelector);
}(window, function (i, r) {
    var l = { extend: function extend(e, t) {
            for (var i in t) {
                e[i] = t[i];
            }return e;
        }, modulo: function modulo(e, t) {
            return (e % t + t) % t;
        } },
        t = Array.prototype.slice;l.makeArray = function (e) {
        return Array.isArray(e) ? e : null == e ? [] : "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && "number" == typeof e.length ? t.call(e) : [e];
    }, l.removeFrom = function (e, t) {
        t = e.indexOf(t);-1 != t && e.splice(t, 1);
    }, l.getParent = function (e, t) {
        for (; e.parentNode && e != document.body;) {
            if (e = e.parentNode, r(e, t)) return e;
        }
    }, l.getQueryElement = function (e) {
        return "string" == typeof e ? document.querySelector(e) : e;
    }, l.handleEvent = function (e) {
        var t = "on" + e.type;this[t] && this[t](e);
    }, l.filterFindElements = function (e, n) {
        e = l.makeArray(e);var o = [];return e.forEach(function (e) {
            if (e instanceof HTMLElement) if (n) {
                r(e, n) && o.push(e);for (var t = e.querySelectorAll(n), i = 0; i < t.length; i++) {
                    o.push(t[i]);
                }
            } else o.push(e);
        }), o;
    }, l.debounceMethod = function (e, t, n) {
        n = n || 100;var o = e.prototype[t],
            r = t + "Timeout";e.prototype[t] = function () {
            var e = this[r];clearTimeout(e);var t = arguments,
                i = this;this[r] = setTimeout(function () {
                o.apply(i, t), delete i[r];
            }, n);
        };
    }, l.docReady = function (e) {
        var t = document.readyState;"complete" == t || "interactive" == t ? setTimeout(e) : document.addEventListener("DOMContentLoaded", e);
    }, l.toDashed = function (e) {
        return e.replace(/(.)([A-Z])/g, function (e, t, i) {
            return t + "-" + i;
        }).toLowerCase();
    };var c = i.console;return l.htmlInit = function (s, a) {
        l.docReady(function () {
            var e = l.toDashed(a),
                n = "data-" + e,
                t = document.querySelectorAll("[" + n + "]"),
                e = document.querySelectorAll(".js-" + e),
                e = l.makeArray(t).concat(l.makeArray(e)),
                o = n + "-options",
                r = i.jQuery;e.forEach(function (t) {
                var e = t.getAttribute(n) || t.getAttribute(o);try {
                    i = e && JSON.parse(e);
                } catch (e) {
                    return void (c && c.error("Error parsing " + n + " on " + t.className + ": " + e));
                }var i = new s(t, i);r && r.data(t, a, i);
            });
        });
    }, l;
}), function (e, t) {
    "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function (e) {
        return t(0, e);
    }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = t(0, require("get-size")) : (e.Flickity = e.Flickity || {}, e.Flickity.Cell = t(0, e.getSize));
}(window, function (e, t) {
    function i(e, t) {
        this.element = e, this.parent = t, this.create();
    }var n = i.prototype;return n.create = function () {
        this.element.style.position = "absolute", this.element.setAttribute("aria-hidden", "true"), this.x = 0, this.shift = 0;
    }, n.destroy = function () {
        this.unselect(), this.element.style.position = "";var e = this.parent.originSide;this.element.style[e] = "";
    }, n.getSize = function () {
        this.size = t(this.element);
    }, n.setPosition = function (e) {
        this.x = e, this.updateTarget(), this.renderPosition(e);
    }, n.updateTarget = n.setDefaultTarget = function () {
        var e = "left" == this.parent.originSide ? "marginLeft" : "marginRight";this.target = this.x + this.size[e] + this.size.width * this.parent.cellAlign;
    }, n.renderPosition = function (e) {
        var t = this.parent.originSide;this.element.style[t] = this.parent.getPositionValue(e);
    }, n.select = function () {
        this.element.classList.add("is-selected"), this.element.removeAttribute("aria-hidden");
    }, n.unselect = function () {
        this.element.classList.remove("is-selected"), this.element.setAttribute("aria-hidden", "true");
    }, n.wrapShift = function (e) {
        this.shift = e, this.renderPosition(this.x + this.parent.slideableWidth * e);
    }, n.remove = function () {
        this.element.parentNode.removeChild(this.element);
    }, i;
}), function (e, t) {
    "function" == typeof define && define.amd ? define("flickity/js/slide", t) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = t() : (e.Flickity = e.Flickity || {}, e.Flickity.Slide = t());
}(window, function () {
    "use strict";
    function e(e) {
        this.parent = e, this.isOriginLeft = "left" == e.originSide, this.cells = [], this.outerWidth = 0, this.height = 0;
    }var t = e.prototype;return t.addCell = function (e) {
        var t;this.cells.push(e), this.outerWidth += e.size.outerWidth, this.height = Math.max(e.size.outerHeight, this.height), 1 == this.cells.length && (this.x = e.x, t = this.isOriginLeft ? "marginLeft" : "marginRight", this.firstMargin = e.size[t]);
    }, t.updateTarget = function () {
        var e = this.isOriginLeft ? "marginRight" : "marginLeft",
            t = this.getLastCell(),
            e = t ? t.size[e] : 0,
            e = this.outerWidth - (this.firstMargin + e);this.target = this.x + this.firstMargin + e * this.parent.cellAlign;
    }, t.getLastCell = function () {
        return this.cells[this.cells.length - 1];
    }, t.select = function () {
        this.cells.forEach(function (e) {
            e.select();
        });
    }, t.unselect = function () {
        this.cells.forEach(function (e) {
            e.unselect();
        });
    }, t.getCellElements = function () {
        return this.cells.map(function (e) {
            return e.element;
        });
    }, e;
}), function (e, t) {
    "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function (e) {
        return t(0, e);
    }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = t(0, require("fizzy-ui-utils")) : (e.Flickity = e.Flickity || {}, e.Flickity.animatePrototype = t(0, e.fizzyUIUtils));
}(window, function (e, t) {
    var i = { startAnimation: function startAnimation() {
            this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate());
        }, animate: function animate() {
            this.applyDragForce(), this.applySelectedAttraction();var e,
                t = this.x;this.integratePhysics(), this.positionSlider(), this.settle(t), this.isAnimating && (e = this, requestAnimationFrame(function () {
                e.animate();
            }));
        }, positionSlider: function positionSlider() {
            var e = this.x;this.options.wrapAround && 1 < this.cells.length && (e = t.modulo(e, this.slideableWidth), e -= this.slideableWidth, this.shiftWrapCells(e)), this.setTranslateX(e, this.isAnimating), this.dispatchScrollEvent();
        }, setTranslateX: function setTranslateX(e, t) {
            e += this.cursorPosition, e = this.options.rightToLeft ? -e : e;e = this.getPositionValue(e);this.slider.style.transform = t ? "translate3d(" + e + ",0,0)" : "translateX(" + e + ")";
        }, dispatchScrollEvent: function dispatchScrollEvent() {
            var e,
                t = this.slides[0];t && (t = (e = -this.x - t.target) / this.slidesWidth, this.dispatchEvent("scroll", null, [t, e]));
        }, positionSliderAtSelected: function positionSliderAtSelected() {
            this.cells.length && (this.x = -this.selectedSlide.target, this.velocity = 0, this.positionSlider());
        }, getPositionValue: function getPositionValue(e) {
            return this.options.percentPosition ? .01 * Math.round(e / this.size.innerWidth * 1e4) + "%" : Math.round(e) + "px";
        }, settle: function settle(e) {
            this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * e) || this.restingFrames++, 2 < this.restingFrames && (this.isAnimating = !1, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle", null, [this.selectedIndex]));
        }, shiftWrapCells: function shiftWrapCells(e) {
            var t = this.cursorPosition + e;this._shiftCells(this.beforeShiftCells, t, -1);e = this.size.innerWidth - (e + this.slideableWidth + this.cursorPosition);this._shiftCells(this.afterShiftCells, e, 1);
        }, _shiftCells: function _shiftCells(e, t, i) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n];o.wrapShift(0 < t ? i : 0), t -= o.size.outerWidth;
            }
        }, _unshiftCells: function _unshiftCells(e) {
            if (e && e.length) for (var t = 0; t < e.length; t++) {
                e[t].wrapShift(0);
            }
        }, integratePhysics: function integratePhysics() {
            this.x += this.velocity, this.velocity *= this.getFrictionFactor();
        }, applyForce: function applyForce(e) {
            this.velocity += e;
        }, getFrictionFactor: function getFrictionFactor() {
            return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"];
        }, getRestingPosition: function getRestingPosition() {
            return this.x + this.velocity / (1 - this.getFrictionFactor());
        }, applyDragForce: function applyDragForce() {
            var e;this.isDraggable && this.isPointerDown && (e = this.dragX - this.x - this.velocity, this.applyForce(e));
        }, applySelectedAttraction: function applySelectedAttraction() {
            var e;this.isDraggable && this.isPointerDown || this.isFreeScrolling || !this.slides.length || (e = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction, this.applyForce(e));
        } };return i;
}), function (s, a) {
    var e;"function" == typeof define && define.amd ? define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function (e, t, i, n, o, r) {
        return a(s, e, t, i, n, o, r);
    }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = a(s, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate")) : (e = s.Flickity, s.Flickity = a(s, s.EvEmitter, s.getSize, s.fizzyUIUtils, e.Cell, e.Slide, e.animatePrototype));
}(window, function (n, e, t, s, i, a, o) {
    var r = n.jQuery,
        l = n.getComputedStyle,
        c = n.console;function u(e, t) {
        for (e = s.makeArray(e); e.length;) {
            t.appendChild(e.shift());
        }
    }var d = 0,
        h = {};function f(e, t) {
        var i = s.getQueryElement(e);if (i) {
            if (this.element = i, this.element.flickityGUID) {
                var n = h[this.element.flickityGUID];return n.option(t), n;
            }r && (this.$element = r(this.element)), this.options = s.extend({}, this.constructor.defaults), this.option(t), this._create();
        } else c && c.error("Bad element for Flickity: " + (i || e));
    }f.defaults = { accessibility: !0, cellAlign: "center", freeScrollFriction: .075, friction: .28, namespaceJQueryEvents: !0, percentPosition: !0, resize: !0, selectedAttraction: .025, setGallerySize: !0 }, f.createMethods = [];var p = f.prototype;s.extend(p, e.prototype), p._create = function () {
        var e,
            t = this.guid = ++d;for (e in this.element.flickityGUID = t, (h[t] = this).selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), (this.options.resize || this.options.watchCSS) && n.addEventListener("resize", this), this.options.on) {
            var i = this.options.on[e];this.on(e, i);
        }f.createMethods.forEach(function (e) {
            this[e]();
        }, this), this.options.watchCSS ? this.watchCSS() : this.activate();
    }, p.option = function (e) {
        s.extend(this.options, e);
    }, p.activate = function () {
        this.isActive || (this.isActive = !0, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize(), u(this._filterFindCellElements(this.element.children), this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydown", this)), this.emitEvent("activate"), this.selectInitialIndex(), this.isInitActivated = !0, this.dispatchEvent("ready"));
    }, p._createSlider = function () {
        var e = document.createElement("div");e.className = "flickity-slider", e.style[this.originSide] = 0, this.slider = e;
    }, p._filterFindCellElements = function (e) {
        return s.filterFindElements(e, this.options.cellSelector);
    }, p.reloadCells = function () {
        this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize();
    }, p._makeCells = function (e) {
        return this._filterFindCellElements(e).map(function (e) {
            return new i(e, this);
        }, this);
    }, p.getLastCell = function () {
        return this.cells[this.cells.length - 1];
    }, p.getLastSlide = function () {
        return this.slides[this.slides.length - 1];
    }, p.positionCells = function () {
        this._sizeCells(this.cells), this._positionCells(0);
    }, p._positionCells = function (e) {
        this.maxCellHeight = (e = e || 0) && this.maxCellHeight || 0;var t,
            i = 0;0 < e && (i = (t = this.cells[e - 1]).x + t.size.outerWidth);for (var n = this.cells.length, o = e; o < n; o++) {
            var r = this.cells[o];r.setPosition(i), i += r.size.outerWidth, this.maxCellHeight = Math.max(r.size.outerHeight, this.maxCellHeight);
        }this.slideableWidth = i, this.updateSlides(), this._containSlides(), this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0;
    }, p._sizeCells = function (e) {
        e.forEach(function (e) {
            e.getSize();
        });
    }, p.updateSlides = function () {
        var n, o, r;this.slides = [], this.cells.length && (n = new a(this), this.slides.push(n), o = "left" == this.originSide ? "marginRight" : "marginLeft", r = this._getCanCellFit(), this.cells.forEach(function (e, t) {
            var i;n.cells.length && (i = n.outerWidth - n.firstMargin + (e.size.outerWidth - e.size[o]), r.call(this, t, i) || (n.updateTarget(), n = new a(this), this.slides.push(n))), n.addCell(e);
        }, this), n.updateTarget(), this.updateSelectedSlide());
    }, p._getCanCellFit = function () {
        var e = this.options.groupCells;if (!e) return function () {
            return !1;
        };if ("number" == typeof e) {
            var t = parseInt(e, 10);return function (e) {
                return e % t != 0;
            };
        }var e = "string" == typeof e && e.match(/^(\d+)%$/),
            i = e ? parseInt(e[1], 10) / 100 : 1;return function (e, t) {
            return t <= (this.size.innerWidth + 1) * i;
        };
    }, p._init = p.reposition = function () {
        this.positionCells(), this.positionSliderAtSelected();
    }, p.getSize = function () {
        this.size = t(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign;
    };var m = { center: { left: .5, right: .5 }, left: { left: 0, right: 1 }, right: { right: 0, left: 1 } };return p.setCellAlign = function () {
        var e = m[this.options.cellAlign];this.cellAlign = e ? e[this.originSide] : this.options.cellAlign;
    }, p.setGallerySize = function () {
        var e;this.options.setGallerySize && (e = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight, this.viewport.style.height = e + "px");
    }, p._getWrapShiftCells = function () {
        var e, t;this.options.wrapAround && (this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells), e = this.cursorPosition, t = this.cells.length - 1, this.beforeShiftCells = this._getGapCells(e, t, -1), e = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(e, 0, 1));
    }, p._getGapCells = function (e, t, i) {
        for (var n = []; 0 < e;) {
            var o = this.cells[t];if (!o) break;n.push(o), t += i, e -= o.size.outerWidth;
        }return n;
    }, p._containSlides = function () {
        var e, t, i, n, o, r;this.options.contain && !this.options.wrapAround && this.cells.length && (e = (t = this.options.rightToLeft) ? "marginRight" : "marginLeft", t = t ? "marginLeft" : "marginRight", i = this.slideableWidth - this.getLastCell().size[t], n = i < this.size.innerWidth, o = this.cursorPosition + this.cells[0].size[e], r = i - this.size.innerWidth * (1 - this.cellAlign), this.slides.forEach(function (e) {
            n ? e.target = i * this.cellAlign : (e.target = Math.max(e.target, o), e.target = Math.min(e.target, r));
        }, this));
    }, p.dispatchEvent = function (e, t, i) {
        var n = t ? [t].concat(i) : i;this.emitEvent(e, n), r && this.$element && (n = e += this.options.namespaceJQueryEvents ? ".flickity" : "", t && ((t = r.Event(t)).type = e, n = t), this.$element.trigger(n, i));
    }, p.select = function (e, t, i) {
        this.isActive && (e = parseInt(e, 10), this._wrapSelect(e), (this.options.wrapAround || t) && (e = s.modulo(e, this.slides.length)), this.slides[e] && (t = this.selectedIndex, this.selectedIndex = e, this.updateSelectedSlide(), i ? this.positionSliderAtSelected() : this.startAnimation(), this.options.adaptiveHeight && this.setGallerySize(), this.dispatchEvent("select", null, [e]), e != t && this.dispatchEvent("change", null, [e]), this.dispatchEvent("cellSelect")));
    }, p._wrapSelect = function (e) {
        var t = this.slides.length;if (!(this.options.wrapAround && 1 < t)) return e;var i = s.modulo(e, t),
            n = Math.abs(i - this.selectedIndex),
            o = Math.abs(i + t - this.selectedIndex),
            i = Math.abs(i - t - this.selectedIndex);!this.isDragSelect && o < n ? e += t : !this.isDragSelect && i < n && (e -= t), e < 0 ? this.x -= this.slideableWidth : t <= e && (this.x += this.slideableWidth);
    }, p.previous = function (e, t) {
        this.select(this.selectedIndex - 1, e, t);
    }, p.next = function (e, t) {
        this.select(this.selectedIndex + 1, e, t);
    }, p.updateSelectedSlide = function () {
        var e = this.slides[this.selectedIndex];e && (this.unselectSelectedSlide(), (this.selectedSlide = e).select(), this.selectedCells = e.cells, this.selectedElements = e.getCellElements(), this.selectedCell = e.cells[0], this.selectedElement = this.selectedElements[0]);
    }, p.unselectSelectedSlide = function () {
        this.selectedSlide && this.selectedSlide.unselect();
    }, p.selectInitialIndex = function () {
        var e = this.options.initialIndex;if (this.isInitActivated) this.select(this.selectedIndex, !1, !0);else {
            if (e && "string" == typeof e) if (this.queryCell(e)) return void this.selectCell(e, !1, !0);var t = 0;e && this.slides[e] && (t = e), this.select(t, !1, !0);
        }
    }, p.selectCell = function (e, t, i) {
        e = this.queryCell(e);e && (e = this.getCellSlideIndex(e), this.select(e, t, i));
    }, p.getCellSlideIndex = function (e) {
        for (var t = 0; t < this.slides.length; t++) {
            if (-1 != this.slides[t].cells.indexOf(e)) return t;
        }
    }, p.getCell = function (e) {
        for (var t = 0; t < this.cells.length; t++) {
            var i = this.cells[t];if (i.element == e) return i;
        }
    }, p.getCells = function (e) {
        e = s.makeArray(e);var t = [];return e.forEach(function (e) {
            e = this.getCell(e);e && t.push(e);
        }, this), t;
    }, p.getCellElements = function () {
        return this.cells.map(function (e) {
            return e.element;
        });
    }, p.getParentCell = function (e) {
        var t = this.getCell(e);return t || (e = s.getParent(e, ".flickity-slider > *"), this.getCell(e));
    }, p.getAdjacentCellElements = function (e, t) {
        if (!e) return this.selectedSlide.getCellElements();t = void 0 === t ? this.selectedIndex : t;var i = this.slides.length;if (i <= 1 + 2 * e) return this.getCellElements();for (var n = [], o = t - e; o <= t + e; o++) {
            var r = this.options.wrapAround ? s.modulo(o, i) : o,
                r = this.slides[r];r && (n = n.concat(r.getCellElements()));
        }return n;
    }, p.queryCell = function (e) {
        if ("number" == typeof e) return this.cells[e];if ("string" == typeof e) {
            if (e.match(/^[#\.]?[\d\/]/)) return;e = this.element.querySelector(e);
        }return this.getCell(e);
    }, p.uiChange = function () {
        this.emitEvent("uiChange");
    }, p.childUIPointerDown = function (e) {
        "touchstart" != e.type && e.preventDefault(), this.focus();
    }, p.onresize = function () {
        this.watchCSS(), this.resize();
    }, s.debounceMethod(f, "onresize", 150), p.resize = function () {
        var e;this.isActive && (this.getSize(), this.options.wrapAround && (this.x = s.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize"), e = this.selectedElements && this.selectedElements[0], this.selectCell(e, !1, !0));
    }, p.watchCSS = function () {
        this.options.watchCSS && (-1 != l(this.element, ":after").content.indexOf("flickity") ? this.activate() : this.deactivate());
    }, p.onkeydown = function (e) {
        var t = document.activeElement && document.activeElement != this.element;!this.options.accessibility || t || (e = f.keyboardHandlers[e.keyCode]) && e.call(this);
    }, f.keyboardHandlers = { 37: function _() {
            var e = this.options.rightToLeft ? "next" : "previous";this.uiChange(), this[e]();
        }, 39: function _() {
            var e = this.options.rightToLeft ? "previous" : "next";this.uiChange(), this[e]();
        } }, p.focus = function () {
        var e = n.pageYOffset;this.element.focus({ preventScroll: !0 }), n.pageYOffset != e && n.scrollTo(n.pageXOffset, e);
    }, p.deactivate = function () {
        this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.unselectSelectedSlide(), this.cells.forEach(function (e) {
            e.destroy();
        }), this.element.removeChild(this.viewport), u(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)), this.isActive = !1, this.emitEvent("deactivate"));
    }, p.destroy = function () {
        this.deactivate(), n.removeEventListener("resize", this), this.allOff(), this.emitEvent("destroy"), r && this.$element && r.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete h[this.guid];
    }, s.extend(p, o), f.data = function (e) {
        e = (e = s.getQueryElement(e)) && e.flickityGUID;return e && h[e];
    }, s.htmlInit(f, "flickity"), r && r.bridget && r.bridget("flickity", f), f.setJQuery = function (e) {
        r = e;
    }, f.Cell = i, f.Slide = a, f;
}), function (t, i) {
    "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function (e) {
        return i(t, e);
    }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = i(t, require("ev-emitter")) : t.Unipointer = i(t, t.EvEmitter);
}(window, function (n, e) {
    function t() {}e = t.prototype = Object.create(e.prototype);e.bindStartEvent = function (e) {
        this._bindStartEvent(e, !0);
    }, e.unbindStartEvent = function (e) {
        this._bindStartEvent(e, !1);
    }, e._bindStartEvent = function (e, t) {
        var i = (t = void 0 === t || t) ? "addEventListener" : "removeEventListener",
            t = "mousedown";n.PointerEvent ? t = "pointerdown" : "ontouchstart" in n && (t = "touchstart"), e[i](t, this);
    }, e.handleEvent = function (e) {
        var t = "on" + e.type;this[t] && this[t](e);
    }, e.getTouch = function (e) {
        for (var t = 0; t < e.length; t++) {
            var i = e[t];if (i.identifier == this.pointerIdentifier) return i;
        }
    }, e.onmousedown = function (e) {
        var t = e.button;t && 0 !== t && 1 !== t || this._pointerDown(e, e);
    }, e.ontouchstart = function (e) {
        this._pointerDown(e, e.changedTouches[0]);
    }, e.onpointerdown = function (e) {
        this._pointerDown(e, e);
    }, e._pointerDown = function (e, t) {
        e.button || this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== t.pointerId ? t.pointerId : t.identifier, this.pointerDown(e, t));
    }, e.pointerDown = function (e, t) {
        this._bindPostStartEvents(e), this.emitEvent("pointerDown", [e, t]);
    };var i = { mousedown: ["mousemove", "mouseup"], touchstart: ["touchmove", "touchend", "touchcancel"], pointerdown: ["pointermove", "pointerup", "pointercancel"] };return e._bindPostStartEvents = function (e) {
        e && ((e = i[e.type]).forEach(function (e) {
            n.addEventListener(e, this);
        }, this), this._boundPointerEvents = e);
    }, e._unbindPostStartEvents = function () {
        this._boundPointerEvents && (this._boundPointerEvents.forEach(function (e) {
            n.removeEventListener(e, this);
        }, this), delete this._boundPointerEvents);
    }, e.onmousemove = function (e) {
        this._pointerMove(e, e);
    }, e.onpointermove = function (e) {
        e.pointerId == this.pointerIdentifier && this._pointerMove(e, e);
    }, e.ontouchmove = function (e) {
        var t = this.getTouch(e.changedTouches);t && this._pointerMove(e, t);
    }, e._pointerMove = function (e, t) {
        this.pointerMove(e, t);
    }, e.pointerMove = function (e, t) {
        this.emitEvent("pointerMove", [e, t]);
    }, e.onmouseup = function (e) {
        this._pointerUp(e, e);
    }, e.onpointerup = function (e) {
        e.pointerId == this.pointerIdentifier && this._pointerUp(e, e);
    }, e.ontouchend = function (e) {
        var t = this.getTouch(e.changedTouches);t && this._pointerUp(e, t);
    }, e._pointerUp = function (e, t) {
        this._pointerDone(), this.pointerUp(e, t);
    }, e.pointerUp = function (e, t) {
        this.emitEvent("pointerUp", [e, t]);
    }, e._pointerDone = function () {
        this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone();
    }, e._pointerReset = function () {
        this.isPointerDown = !1, delete this.pointerIdentifier;
    }, e.pointerDone = function () {}, e.onpointercancel = function (e) {
        e.pointerId == this.pointerIdentifier && this._pointerCancel(e, e);
    }, e.ontouchcancel = function (e) {
        var t = this.getTouch(e.changedTouches);t && this._pointerCancel(e, t);
    }, e._pointerCancel = function (e, t) {
        this._pointerDone(), this.pointerCancel(e, t);
    }, e.pointerCancel = function (e, t) {
        this.emitEvent("pointerCancel", [e, t]);
    }, t.getPointerPoint = function (e) {
        return { x: e.pageX, y: e.pageY };
    }, t;
}), function (t, i) {
    "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function (e) {
        return i(t, e);
    }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = i(t, require("unipointer")) : t.Unidragger = i(t, t.Unipointer);
}(window, function (r, e) {
    function t() {}var i = t.prototype = Object.create(e.prototype);i.bindHandles = function () {
        this._bindHandles(!0);
    }, i.unbindHandles = function () {
        this._bindHandles(!1);
    }, i._bindHandles = function (e) {
        for (var t = (e = void 0 === e || e) ? "addEventListener" : "removeEventListener", i = e ? this._touchActionValue : "", n = 0; n < this.handles.length; n++) {
            var o = this.handles[n];this._bindStartEvent(o, e), o[t]("click", this), r.PointerEvent && (o.style.touchAction = i);
        }
    }, i._touchActionValue = "none", i.pointerDown = function (e, t) {
        this.okayPointerDown(e) && (this.pointerDownPointer = t, e.preventDefault(), this.pointerDownBlur(), this._bindPostStartEvents(e), this.emitEvent("pointerDown", [e, t]));
    };var n = { TEXTAREA: !0, INPUT: !0, SELECT: !0, OPTION: !0 },
        o = { radio: !0, checkbox: !0, button: !0, submit: !0, image: !0, file: !0 };return i.okayPointerDown = function (e) {
        var t = n[e.target.nodeName],
            e = o[e.target.type],
            e = !t || e;return e || this._pointerReset(), e;
    }, i.pointerDownBlur = function () {
        var e = document.activeElement;e && e.blur && e != document.body && e.blur();
    }, i.pointerMove = function (e, t) {
        var i = this._dragPointerMove(e, t);this.emitEvent("pointerMove", [e, t, i]), this._dragMove(e, t, i);
    }, i._dragPointerMove = function (e, t) {
        var i = { x: t.pageX - this.pointerDownPointer.pageX, y: t.pageY - this.pointerDownPointer.pageY };return !this.isDragging && this.hasDragStarted(i) && this._dragStart(e, t), i;
    }, i.hasDragStarted = function (e) {
        return 3 < Math.abs(e.x) || 3 < Math.abs(e.y);
    }, i.pointerUp = function (e, t) {
        this.emitEvent("pointerUp", [e, t]), this._dragPointerUp(e, t);
    }, i._dragPointerUp = function (e, t) {
        this.isDragging ? this._dragEnd(e, t) : this._staticClick(e, t);
    }, i._dragStart = function (e, t) {
        this.isDragging = !0, this.isPreventingClicks = !0, this.dragStart(e, t);
    }, i.dragStart = function (e, t) {
        this.emitEvent("dragStart", [e, t]);
    }, i._dragMove = function (e, t, i) {
        this.isDragging && this.dragMove(e, t, i);
    }, i.dragMove = function (e, t, i) {
        e.preventDefault(), this.emitEvent("dragMove", [e, t, i]);
    }, i._dragEnd = function (e, t) {
        this.isDragging = !1, setTimeout(function () {
            delete this.isPreventingClicks;
        }.bind(this)), this.dragEnd(e, t);
    }, i.dragEnd = function (e, t) {
        this.emitEvent("dragEnd", [e, t]);
    }, i.onclick = function (e) {
        this.isPreventingClicks && e.preventDefault();
    }, i._staticClick = function (e, t) {
        this.isIgnoringMouseUp && "mouseup" == e.type || (this.staticClick(e, t), "mouseup" != e.type && (this.isIgnoringMouseUp = !0, setTimeout(function () {
            delete this.isIgnoringMouseUp;
        }.bind(this), 400)));
    }, i.staticClick = function (e, t) {
        this.emitEvent("staticClick", [e, t]);
    }, t.getPointerPoint = e.getPointerPoint, t;
}), function (n, o) {
    "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function (e, t, i) {
        return o(n, e, t, i);
    }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = o(n, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : n.Flickity = o(n, n.Flickity, n.Unidragger, n.fizzyUIUtils);
}(window, function (i, e, t, r) {
    r.extend(e.defaults, { draggable: ">1", dragThreshold: 3 }), e.createMethods.push("_createDrag");var n = e.prototype;r.extend(n, t.prototype), n._touchActionValue = "pan-y";var o = "createTouch" in document,
        s = !1;n._createDrag = function () {
        this.on("activate", this.onActivateDrag), this.on("uiChange", this._uiChangeDrag), this.on("deactivate", this.onDeactivateDrag), this.on("cellChange", this.updateDraggable), o && !s && (i.addEventListener("touchmove", function () {}), s = !0);
    }, n.onActivateDrag = function () {
        this.handles = [this.viewport], this.bindHandles(), this.updateDraggable();
    }, n.onDeactivateDrag = function () {
        this.unbindHandles(), this.element.classList.remove("is-draggable");
    }, n.updateDraggable = function () {
        ">1" == this.options.draggable ? this.isDraggable = 1 < this.slides.length : this.isDraggable = this.options.draggable, this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable");
    }, n.bindDrag = function () {
        this.options.draggable = !0, this.updateDraggable();
    }, n.unbindDrag = function () {
        this.options.draggable = !1, this.updateDraggable();
    }, n._uiChangeDrag = function () {
        delete this.isFreeScrolling;
    }, n.pointerDown = function (e, t) {
        this.isDraggable ? this.okayPointerDown(e) && (this._pointerDownPreventDefault(e), this.pointerDownFocus(e), document.activeElement != this.element && this.pointerDownBlur(), this.dragX = this.x, this.viewport.classList.add("is-pointer-down"), this.pointerDownScroll = l(), i.addEventListener("scroll", this), this._pointerDownDefault(e, t)) : this._pointerDownDefault(e, t);
    }, n._pointerDownDefault = function (e, t) {
        this.pointerDownPointer = { pageX: t.pageX, pageY: t.pageY }, this._bindPostStartEvents(e), this.dispatchEvent("pointerDown", e, [t]);
    };var a = { INPUT: !0, TEXTAREA: !0, SELECT: !0 };function l() {
        return { x: i.pageXOffset, y: i.pageYOffset };
    }return n.pointerDownFocus = function (e) {
        a[e.target.nodeName] || this.focus();
    }, n._pointerDownPreventDefault = function (e) {
        var t = "touchstart" == e.type,
            i = "touch" == e.pointerType,
            n = a[e.target.nodeName];t || i || n || e.preventDefault();
    }, n.hasDragStarted = function (e) {
        return Math.abs(e.x) > this.options.dragThreshold;
    }, n.pointerUp = function (e, t) {
        delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", e, [t]), this._dragPointerUp(e, t);
    }, n.pointerDone = function () {
        i.removeEventListener("scroll", this), delete this.pointerDownScroll;
    }, n.dragStart = function (e, t) {
        this.isDraggable && (this.dragStartPosition = this.x, this.startAnimation(), i.removeEventListener("scroll", this), this.dispatchEvent("dragStart", e, [t]));
    }, n.pointerMove = function (e, t) {
        var i = this._dragPointerMove(e, t);this.dispatchEvent("pointerMove", e, [t, i]), this._dragMove(e, t, i);
    }, n.dragMove = function (e, t, i) {
        var n, o;this.isDraggable && (e.preventDefault(), this.previousDragX = this.dragX, o = this.options.rightToLeft ? -1 : 1, this.options.wrapAround && (i.x = i.x % this.slideableWidth), n = this.dragStartPosition + i.x * o, !this.options.wrapAround && this.slides.length && (n = (n = (o = Math.max(-this.slides[0].target, this.dragStartPosition)) < n ? .5 * (n + o) : n) < (o = Math.min(-this.getLastSlide().target, this.dragStartPosition)) ? .5 * (n + o) : n), this.dragX = n, this.dragMoveTime = new Date(), this.dispatchEvent("dragMove", e, [t, i]));
    }, n.dragEnd = function (e, t) {
        var i, n;this.isDraggable && (this.options.freeScroll && (this.isFreeScrolling = !0), i = this.dragEndRestingSelect(), this.options.freeScroll && !this.options.wrapAround ? (n = this.getRestingPosition(), this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target) : this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect()), delete this.previousDragX, this.isDragSelect = this.options.wrapAround, this.select(i), delete this.isDragSelect, this.dispatchEvent("dragEnd", e, [t]));
    }, n.dragEndRestingSelect = function () {
        var e = this.getRestingPosition(),
            t = Math.abs(this.getSlideDistance(-e, this.selectedIndex)),
            i = this._getClosestResting(e, t, 1),
            t = this._getClosestResting(e, t, -1);return (i.distance < t.distance ? i : t).index;
    }, n._getClosestResting = function (e, t, i) {
        for (var n = this.selectedIndex, o = 1 / 0, r = this.options.contain && !this.options.wrapAround ? function (e, t) {
            return e <= t;
        } : function (e, t) {
            return e < t;
        }; r(t, o) && (o = t, null !== (t = this.getSlideDistance(-e, n += i)));) {
            t = Math.abs(t);
        }return { distance: o, index: n - i };
    }, n.getSlideDistance = function (e, t) {
        var i = this.slides.length,
            n = this.options.wrapAround && 1 < i,
            o = n ? r.modulo(t, i) : t,
            o = this.slides[o];if (!o) return null;i = n ? this.slideableWidth * Math.floor(t / i) : 0;return e - (o.target + i);
    }, n.dragEndBoostSelect = function () {
        if (void 0 === this.previousDragX || !this.dragMoveTime || 100 < new Date() - this.dragMoveTime) return 0;var e = this.getSlideDistance(-this.dragX, this.selectedIndex),
            t = this.previousDragX - this.dragX;return 0 < e && 0 < t ? 1 : e < 0 && t < 0 ? -1 : 0;
    }, n.staticClick = function (e, t) {
        var i = this.getParentCell(e.target),
            n = i && i.element,
            i = i && this.cells.indexOf(i);this.dispatchEvent("staticClick", e, [t, n, i]);
    }, n.onscroll = function () {
        var e = l(),
            t = this.pointerDownScroll.x - e.x,
            e = this.pointerDownScroll.y - e.y;(3 < Math.abs(t) || 3 < Math.abs(e)) && this._pointerDone();
    }, e;
}), function (e, n) {
    "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function (e, t, i) {
        return n(0, e, t, i);
    }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = n(0, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : n(0, e.Flickity, e.Unipointer, e.fizzyUIUtils);
}(window, function (e, t, i, n) {
    "use strict";
    var o = "http://www.w3.org/2000/svg";function r(e, t) {
        this.direction = e, this.parent = t, this._create();
    }(r.prototype = Object.create(i.prototype))._create = function () {
        this.isEnabled = !0, this.isPrevious = -1 == this.direction;var e = this.parent.options.rightToLeft ? 1 : -1;this.isLeft = this.direction == e;var t = this.element = document.createElement("button");t.className = "flickity-button flickity-prev-next-button", t.className += this.isPrevious ? " previous" : " next", t.setAttribute("type", "button"), this.disable(), t.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");e = this.createSVG();t.appendChild(e), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent));
    }, r.prototype.activate = function () {
        this.bindStartEvent(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element);
    }, r.prototype.deactivate = function () {
        this.parent.element.removeChild(this.element), this.unbindStartEvent(this.element), this.element.removeEventListener("click", this);
    }, r.prototype.createSVG = function () {
        var e = document.createElementNS(o, "svg");e.setAttribute("class", "flickity-button-icon"), e.setAttribute("viewBox", "0 0 100 100");var t,
            i = document.createElementNS(o, "path"),
            t = "string" != typeof (t = this.parent.options.arrowShape) ? "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z" : t;return i.setAttribute("d", t), i.setAttribute("class", "arrow"), this.isLeft || i.setAttribute("transform", "translate(100, 100) rotate(180) "), e.appendChild(i), e;
    }, r.prototype.handleEvent = n.handleEvent, r.prototype.onclick = function () {
        var e;this.isEnabled && (this.parent.uiChange(), e = this.isPrevious ? "previous" : "next", this.parent[e]());
    }, r.prototype.enable = function () {
        this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0);
    }, r.prototype.disable = function () {
        this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1);
    }, r.prototype.update = function () {
        var e = this.parent.slides;this.parent.options.wrapAround && 1 < e.length ? this.enable() : (e = e.length ? e.length - 1 : 0, e = this.isPrevious ? 0 : e, this[this.parent.selectedIndex == e ? "disable" : "enable"]());
    }, r.prototype.destroy = function () {
        this.deactivate(), this.allOff();
    }, n.extend(t.defaults, { prevNextButtons: !0, arrowShape: { x0: 10, x1: 60, y1: 50, x2: 70, y2: 40, x3: 30 } }), t.createMethods.push("_createPrevNextButtons");n = t.prototype;return n._createPrevNextButtons = function () {
        this.options.prevNextButtons && (this.prevButton = new r(-1, this), this.nextButton = new r(1, this), this.on("activate", this.activatePrevNextButtons));
    }, n.activatePrevNextButtons = function () {
        this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons);
    }, n.deactivatePrevNextButtons = function () {
        this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons);
    }, t.PrevNextButton = r, t;
}), function (e, n) {
    "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function (e, t, i) {
        return n(0, e, t, i);
    }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = n(0, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : n(0, e.Flickity, e.Unipointer, e.fizzyUIUtils);
}(window, function (e, t, i, n) {
    function o(e) {
        this.parent = e, this._create();
    }(o.prototype = Object.create(i.prototype))._create = function () {
        this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [], this.handleClick = this.onClick.bind(this), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent));
    }, o.prototype.activate = function () {
        this.setDots(), this.holder.addEventListener("click", this.handleClick), this.bindStartEvent(this.holder), this.parent.element.appendChild(this.holder);
    }, o.prototype.deactivate = function () {
        this.holder.removeEventListener("click", this.handleClick), this.unbindStartEvent(this.holder), this.parent.element.removeChild(this.holder);
    }, o.prototype.setDots = function () {
        var e = this.parent.slides.length - this.dots.length;0 < e ? this.addDots(e) : e < 0 && this.removeDots(-e);
    }, o.prototype.addDots = function (e) {
        for (var t = document.createDocumentFragment(), i = [], n = this.dots.length, o = n + e, r = n; r < o; r++) {
            var s = document.createElement("li");s.className = "dot", s.setAttribute("aria-label", "Page dot " + (r + 1)), t.appendChild(s), i.push(s);
        }this.holder.appendChild(t), this.dots = this.dots.concat(i);
    }, o.prototype.removeDots = function (e) {
        this.dots.splice(this.dots.length - e, e).forEach(function (e) {
            this.holder.removeChild(e);
        }, this);
    }, o.prototype.updateSelected = function () {
        this.selectedDot && (this.selectedDot.className = "dot", this.selectedDot.removeAttribute("aria-current")), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected", this.selectedDot.setAttribute("aria-current", "step"));
    }, o.prototype.onTap = o.prototype.onClick = function (e) {
        e = e.target;"LI" == e.nodeName && (this.parent.uiChange(), e = this.dots.indexOf(e), this.parent.select(e));
    }, o.prototype.destroy = function () {
        this.deactivate(), this.allOff();
    }, t.PageDots = o, n.extend(t.defaults, { pageDots: !0 }), t.createMethods.push("_createPageDots");n = t.prototype;return n._createPageDots = function () {
        this.options.pageDots && (this.pageDots = new o(this), this.on("activate", this.activatePageDots), this.on("select", this.updateSelectedPageDots), this.on("cellChange", this.updatePageDots), this.on("resize", this.updatePageDots), this.on("deactivate", this.deactivatePageDots));
    }, n.activatePageDots = function () {
        this.pageDots.activate();
    }, n.updateSelectedPageDots = function () {
        this.pageDots.updateSelected();
    }, n.updatePageDots = function () {
        this.pageDots.setDots();
    }, n.deactivatePageDots = function () {
        this.pageDots.deactivate();
    }, t.PageDots = o, t;
}), function (e, t) {
    "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], t) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = t(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : t(e.EvEmitter, e.fizzyUIUtils, e.Flickity);
}(window, function (e, t, i) {
    function n(e) {
        this.parent = e, this.state = "stopped", this.onVisibilityChange = this.visibilityChange.bind(this), this.onVisibilityPlay = this.visibilityPlay.bind(this);
    }(n.prototype = Object.create(e.prototype)).play = function () {
        "playing" != this.state && (document.hidden ? document.addEventListener("visibilitychange", this.onVisibilityPlay) : (this.state = "playing", document.addEventListener("visibilitychange", this.onVisibilityChange), this.tick()));
    }, n.prototype.tick = function () {
        var e, t;"playing" == this.state && (e = "number" == typeof (e = this.parent.options.autoPlay) ? e : 3e3, (t = this).clear(), this.timeout = setTimeout(function () {
            t.parent.next(!0), t.tick();
        }, e));
    }, n.prototype.stop = function () {
        this.state = "stopped", this.clear(), document.removeEventListener("visibilitychange", this.onVisibilityChange);
    }, n.prototype.clear = function () {
        clearTimeout(this.timeout);
    }, n.prototype.pause = function () {
        "playing" == this.state && (this.state = "paused", this.clear());
    }, n.prototype.unpause = function () {
        "paused" == this.state && this.play();
    }, n.prototype.visibilityChange = function () {
        this[document.hidden ? "pause" : "unpause"]();
    }, n.prototype.visibilityPlay = function () {
        this.play(), document.removeEventListener("visibilitychange", this.onVisibilityPlay);
    }, t.extend(i.defaults, { pauseAutoPlayOnHover: !0 }), i.createMethods.push("_createPlayer");t = i.prototype;return t._createPlayer = function () {
        this.player = new n(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer);
    }, t.activatePlayer = function () {
        this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this));
    }, t.playPlayer = function () {
        this.player.play();
    }, t.stopPlayer = function () {
        this.player.stop();
    }, t.pausePlayer = function () {
        this.player.pause();
    }, t.unpausePlayer = function () {
        this.player.unpause();
    }, t.deactivatePlayer = function () {
        this.player.stop(), this.element.removeEventListener("mouseenter", this);
    }, t.onmouseenter = function () {
        this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this));
    }, t.onmouseleave = function () {
        this.player.unpause(), this.element.removeEventListener("mouseleave", this);
    }, i.Player = n, i;
}), function (e, i) {
    "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function (e, t) {
        return i(0, e, t);
    }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = i(0, require("./flickity"), require("fizzy-ui-utils")) : i(0, e.Flickity, e.fizzyUIUtils);
}(window, function (e, t, n) {
    var i = t.prototype;return i.insert = function (e, t) {
        var i,
            n,
            o,
            r,
            s = this._makeCells(e);s && s.length && (r = this.cells.length, t = void 0 === t ? r : t, o = s, n = document.createDocumentFragment(), o.forEach(function (e) {
            n.appendChild(e.element);
        }), i = n, (e = t == r) ? this.slider.appendChild(i) : (o = this.cells[t].element, this.slider.insertBefore(i, o)), 0 === t ? this.cells = s.concat(this.cells) : e ? this.cells = this.cells.concat(s) : (r = this.cells.splice(t, r - t), this.cells = this.cells.concat(s).concat(r)), this._sizeCells(s), this.cellChange(t, !0));
    }, i.append = function (e) {
        this.insert(e, this.cells.length);
    }, i.prepend = function (e) {
        this.insert(e, 0);
    }, i.remove = function (e) {
        var i,
            e = this.getCells(e);e && e.length && (i = this.cells.length - 1, e.forEach(function (e) {
            e.remove();var t = this.cells.indexOf(e);i = Math.min(t, i), n.removeFrom(this.cells, e);
        }, this), this.cellChange(i, !0));
    }, i.cellSizeChange = function (e) {
        e = this.getCell(e);e && (e.getSize(), e = this.cells.indexOf(e), this.cellChange(e));
    }, i.cellChange = function (e, t) {
        var i = this.selectedElement;this._positionCells(e), this._getWrapShiftCells(), this.setGallerySize();i = this.getCell(i);i && (this.selectedIndex = this.getCellSlideIndex(i)), this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex), this.emitEvent("cellChange", [e]), this.select(this.selectedIndex), t && this.positionSliderAtSelected();
    }, t;
}), function (e, i) {
    "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function (e, t) {
        return i(0, e, t);
    }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = i(0, require("./flickity"), require("fizzy-ui-utils")) : i(0, e.Flickity, e.fizzyUIUtils);
}(window, function (e, t, o) {
    "use strict";
    t.createMethods.push("_createLazyload");var i = t.prototype;function n(e, t) {
        this.img = e, this.flickity = t, this.load();
    }return i._createLazyload = function () {
        this.on("select", this.lazyLoad);
    }, i.lazyLoad = function () {
        var t,
            e = this.options.lazyLoad;e && (e = this.getAdjacentCellElements("number" == typeof e ? e : 0), t = [], e.forEach(function (e) {
            e = function (e) {
                if ("IMG" == e.nodeName) {
                    var t = e.getAttribute("data-flickity-lazyload"),
                        i = e.getAttribute("data-flickity-lazyload-src"),
                        n = e.getAttribute("data-flickity-lazyload-srcset");if (t || i || n) return [e];
                }e = e.querySelectorAll("img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]");return o.makeArray(e);
            }(e);t = t.concat(e);
        }), t.forEach(function (e) {
            new n(e, this);
        }, this));
    }, n.prototype.handleEvent = o.handleEvent, n.prototype.load = function () {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this);var e = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src"),
            t = this.img.getAttribute("data-flickity-lazyload-srcset");this.img.src = e, t && this.img.setAttribute("srcset", t), this.img.removeAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload-src"), this.img.removeAttribute("data-flickity-lazyload-srcset");
    }, n.prototype.onload = function (e) {
        this.complete(e, "flickity-lazyloaded");
    }, n.prototype.onerror = function (e) {
        this.complete(e, "flickity-lazyerror");
    }, n.prototype.complete = function (e, t) {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);var i = this.flickity.getParentCell(this.img),
            i = i && i.element;this.flickity.cellSizeChange(i), this.img.classList.add(t), this.flickity.dispatchEvent("lazyLoad", e, i);
    }, t.LazyLoader = n, t;
}), function (e) {
    "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")));
}((window, function (e) {
    return e;
})), function (e, t) {
    "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], t) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = t(require("flickity"), require("fizzy-ui-utils")) : e.Flickity = t(e.Flickity, e.fizzyUIUtils);
}(window, function (i, n) {
    i.createMethods.push("_createAsNavFor");var e = i.prototype;return e._createAsNavFor = function () {
        this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor);var e,
            t = this.options.asNavFor;t && (e = this, setTimeout(function () {
            e.setNavCompanion(t);
        }));
    }, e.setNavCompanion = function (e) {
        e = n.getQueryElement(e);var t,
            e = i.data(e);e && e != this && (this.navCompanion = e, (t = this).onNavCompanionSelect = function () {
            t.navCompanionSelect();
        }, e.on("select", this.onNavCompanionSelect), this.on("staticClick", this.onNavStaticClick), this.navCompanionSelect(!0));
    }, e.navCompanionSelect = function (e) {
        var t,
            i,
            n = this.navCompanion && this.navCompanion.selectedCells;n && (i = n[0], t = this.navCompanion.cells.indexOf(i), i = t + n.length - 1, n = Math.floor((n = this.navCompanion.cellAlign, (i - t) * n + t)), this.selectCell(n, !1, e), this.removeNavSelectedElements(), n >= this.cells.length || (i = this.cells.slice(t, 1 + i), this.navSelectedElements = i.map(function (e) {
            return e.element;
        }), this.changeNavSelectedClass("add")));
    }, e.changeNavSelectedClass = function (t) {
        this.navSelectedElements.forEach(function (e) {
            e.classList[t]("is-nav-selected");
        });
    }, e.activateAsNavFor = function () {
        this.navCompanionSelect(!0);
    }, e.removeNavSelectedElements = function () {
        this.navSelectedElements && (this.changeNavSelectedClass("remove"), delete this.navSelectedElements);
    }, e.onNavStaticClick = function (e, t, i, n) {
        "number" == typeof n && this.navCompanion.selectCell(n);
    }, e.deactivateAsNavFor = function () {
        this.removeNavSelectedElements();
    }, e.destroyAsNavFor = function () {
        this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion);
    }, i;
}), function (t, i) {
    "use strict";
    "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function (e) {
        return i(t, e);
    }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = i(t, require("ev-emitter")) : t.imagesLoaded = i(t, t.EvEmitter);
}("undefined" != typeof window ? window : this, function (t, e) {
    var r = t.jQuery,
        s = t.console;function a(e, t) {
        for (var i in t) {
            e[i] = t[i];
        }return e;
    }var l = Array.prototype.slice;function c(e, t, i) {
        if (!(this instanceof c)) return new c(e, t, i);var n,
            o = e;(o = "string" == typeof e ? document.querySelectorAll(e) : o) ? (this.elements = (n = o, Array.isArray(n) ? n : "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) && "number" == typeof n.length ? l.call(n) : [n]), this.options = a({}, this.options), "function" == typeof t ? i = t : a(this.options, t), i && this.on("always", i), this.getImages(), r && (this.jqDeferred = new r.Deferred()), setTimeout(this.check.bind(this))) : s.error("Bad element for imagesLoaded " + (o || e));
    }(c.prototype = Object.create(e.prototype)).options = {}, c.prototype.getImages = function () {
        this.images = [], this.elements.forEach(this.addElementImages, this);
    }, c.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e), !0 === this.options.background && this.addElementBackgroundImages(e);var t = e.nodeType;if (t && u[t]) {
            for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];this.addImage(o);
            }if ("string" == typeof this.options.background) for (var r = e.querySelectorAll(this.options.background), n = 0; n < r.length; n++) {
                var s = r[n];this.addElementBackgroundImages(s);
            }
        }
    };var u = { 1: !0, 9: !0, 11: !0 };function i(e) {
        this.img = e;
    }function n(e, t) {
        this.url = e, this.element = t, this.img = new Image();
    }return c.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);if (t) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
            var o = n && n[2];o && this.addBackground(o, e), n = i.exec(t.backgroundImage);
        }
    }, c.prototype.addImage = function (e) {
        e = new i(e);this.images.push(e);
    }, c.prototype.addBackground = function (e, t) {
        t = new n(e, t);this.images.push(t);
    }, c.prototype.check = function () {
        var n = this;function t(e, t, i) {
            setTimeout(function () {
                n.progress(e, t, i);
            });
        }this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? this.images.forEach(function (e) {
            e.once("progress", t), e.check();
        }) : this.complete();
    }, c.prototype.progress = function (e, t, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && s && s.log("progress: " + i, e, t);
    }, c.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred && (e = this.hasAnyBroken ? "reject" : "resolve", this.jqDeferred[e](this));
    }, (i.prototype = Object.create(e.prototype)).check = function () {
        this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image(), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.src);
    }, i.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth;
    }, i.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.img, t]);
    }, i.prototype.handleEvent = function (e) {
        var t = "on" + e.type;this[t] && this[t](e);
    }, i.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
    }, i.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
    }, i.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
    }, (n.prototype = Object.create(i.prototype)).check = function () {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
    }, n.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
    }, n.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.element, t]);
    }, (c.makeJQueryPlugin = function (e) {
        (e = e || t.jQuery) && ((r = e).fn.imagesLoaded = function (e, t) {
            return new c(this, e, t).jqDeferred.promise(r(this));
        });
    })(), c;
}), function (e, i) {
    "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function (e, t) {
        return i(0, e, t);
    }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = i(0, require("flickity"), require("imagesloaded")) : e.Flickity = i(0, e.Flickity, e.imagesLoaded);
}(window, function (e, t, n) {
    "use strict";
    t.createMethods.push("_createImagesLoaded");var i = t.prototype;return i._createImagesLoaded = function () {
        this.on("activate", this.imagesLoaded);
    }, i.imagesLoaded = function () {
        var i;this.options.imagesLoaded && n((i = this).slider).on("progress", function (e, t) {
            t = i.getParentCell(t.img), i.cellSizeChange(t && t.element), i.options.freeScroll || i.positionSliderAtSelected();
        });
    }, t;
}), function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define([], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = t() : e.Headroom = t();
}(this, function () {
    "use strict";
    var e = { bind: !!function () {}.bind, classList: "classList" in document.documentElement, rAF: !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame) };function t(e) {
        this.callback = e, this.ticking = !1;
    }function s(e) {
        if (arguments.length <= 0) throw new Error("Missing arguments in extend function");for (var t, i, n = e || {}, o = 1; o < arguments.length; o++) {
            var r = arguments[o] || {};for (t in r) {
                "object" != _typeof(n[t]) || (i = n[t]) && "undefined" != typeof window && (i === window || i.nodeType) ? n[t] = n[t] || r[t] : n[t] = s(n[t], r[t]);
            }
        }return n;
    }function i(e, t) {
        t = s(t, i.options), this.lastKnownScrollY = 0, this.elem = e, this.tolerance = (e = t.tolerance) === Object(e) ? e : { down: e, up: e }, this.classes = t.classes, this.offset = t.offset, this.scroller = t.scroller, this.initialised = !1, this.onPin = t.onPin, this.onUnpin = t.onUnpin, this.onTop = t.onTop, this.onNotTop = t.onNotTop, this.onBottom = t.onBottom, this.onNotBottom = t.onNotBottom;
    }return window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame, t.prototype = { constructor: t, update: function update() {
            this.callback && this.callback(), this.ticking = !1;
        }, requestTick: function requestTick() {
            this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), this.ticking = !0);
        }, handleEvent: function handleEvent() {
            this.requestTick();
        } }, i.prototype = { constructor: i, init: function init() {
            if (i.cutsTheMustard) return this.debouncer = new t(this.update.bind(this)), this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), this;
        }, destroy: function destroy() {
            var e,
                t = this.classes;for (e in this.initialised = !1, t) {
                t.hasOwnProperty(e) && this.elem.classList.remove(t[e]);
            }this.scroller.removeEventListener("scroll", this.debouncer, !1);
        }, attachEvent: function attachEvent() {
            this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent());
        }, unpin: function unpin() {
            var e = this.elem.classList,
                t = this.classes;!e.contains(t.pinned) && e.contains(t.unpinned) || (e.add(t.unpinned), e.remove(t.pinned), this.onUnpin && this.onUnpin.call(this));
        }, pin: function pin() {
            var e = this.elem.classList,
                t = this.classes;e.contains(t.unpinned) && (e.remove(t.unpinned), e.add(t.pinned), this.onPin && this.onPin.call(this));
        }, top: function top() {
            var e = this.elem.classList,
                t = this.classes;e.contains(t.top) || (e.add(t.top), e.remove(t.notTop), this.onTop && this.onTop.call(this));
        }, notTop: function notTop() {
            var e = this.elem.classList,
                t = this.classes;e.contains(t.notTop) || (e.add(t.notTop), e.remove(t.top), this.onNotTop && this.onNotTop.call(this));
        }, bottom: function bottom() {
            var e = this.elem.classList,
                t = this.classes;e.contains(t.bottom) || (e.add(t.bottom), e.remove(t.notBottom), this.onBottom && this.onBottom.call(this));
        }, notBottom: function notBottom() {
            var e = this.elem.classList,
                t = this.classes;e.contains(t.notBottom) || (e.add(t.notBottom), e.remove(t.bottom), this.onNotBottom && this.onNotBottom.call(this));
        }, getScrollY: function getScrollY() {
            return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset : (void 0 !== this.scroller.scrollTop ? this.scroller : document.documentElement || document.body.parentNode || document.body).scrollTop;
        }, getViewportHeight: function getViewportHeight() {
            return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        }, getElementPhysicalHeight: function getElementPhysicalHeight(e) {
            return Math.max(e.offsetHeight, e.clientHeight);
        }, getScrollerPhysicalHeight: function getScrollerPhysicalHeight() {
            return this.scroller === window || this.scroller === document.body ? this.getViewportHeight() : this.getElementPhysicalHeight(this.scroller);
        }, getDocumentHeight: function getDocumentHeight() {
            var e = document.body,
                t = document.documentElement;return Math.max(e.scrollHeight, t.scrollHeight, e.offsetHeight, t.offsetHeight, e.clientHeight, t.clientHeight);
        }, getElementHeight: function getElementHeight(e) {
            return Math.max(e.scrollHeight, e.offsetHeight, e.clientHeight);
        }, getScrollerHeight: function getScrollerHeight() {
            return this.scroller === window || this.scroller === document.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller);
        }, isOutOfBounds: function isOutOfBounds(e) {
            var t = e < 0,
                e = e + this.getScrollerPhysicalHeight() > this.getScrollerHeight();return t || e;
        }, toleranceExceeded: function toleranceExceeded(e, t) {
            return Math.abs(e - this.lastKnownScrollY) >= this.tolerance[t];
        }, shouldUnpin: function shouldUnpin(e, t) {
            var i = e > this.lastKnownScrollY,
                e = e >= this.offset;return i && e && t;
        }, shouldPin: function shouldPin(e, t) {
            var i = e < this.lastKnownScrollY,
                e = e <= this.offset;return i && t || e;
        }, update: function update() {
            var e = this.getScrollY(),
                t = e > this.lastKnownScrollY ? "down" : "up",
                t = this.toleranceExceeded(e, t);this.isOutOfBounds(e) || (e <= this.offset ? this.top() : this.notTop(), e + this.getViewportHeight() >= this.getScrollerHeight() ? this.bottom() : this.notBottom(), this.shouldUnpin(e, t) ? this.unpin() : this.shouldPin(e, t) && this.pin(), this.lastKnownScrollY = e);
        } }, i.options = { tolerance: { up: 0, down: 0 }, offset: 0, scroller: window, classes: { pinned: "headroom--pinned", unpinned: "headroom--unpinned", top: "headroom--top", notTop: "headroom--not-top", bottom: "headroom--bottom", notBottom: "headroom--not-bottom", initial: "headroom" } }, i.cutsTheMustard = void 0 !== e && e.rAF && e.bind && e.classList, i;
}), function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery);
}(function (o) {
    "use strict";
    var v = o.scrollTo = function (e, t, i) {
        return o(window).scrollTo(e, t, i);
    };function r(e) {
        return !e.nodeName || -1 !== o.inArray(e.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]);
    }function t(e) {
        return o.isFunction(e) || o.isPlainObject(e) ? e : { top: e, left: e };
    }return v.defaults = { axis: "xy", duration: 0, limit: !0 }, o.fn.scrollTo = function (e, i, m) {
        "object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) && (m = i, i = 0), "function" == typeof m && (m = { onAfter: m }), "max" === e && (e = 9e9), m = o.extend({}, v.defaults, m), i = i || m.duration;var g = m.queue && 1 < m.axis.length;return g && (i /= 2), m.offset = t(m.offset), m.over = t(m.over), this.each(function () {
            if (null !== e) {
                var a,
                    l = r(this),
                    c = l ? this.contentWindow || window : this,
                    u = o(c),
                    d = e,
                    h = {};switch (typeof d === "undefined" ? "undefined" : _typeof(d)) {case "number":case "string":
                        if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(d)) {
                            d = t(d);break;
                        }d = l ? o(d) : o(d, c);case "object":
                        if (0 === d.length) return;(d.is || d.style) && (a = (d = o(d)).offset());}var f = o.isFunction(m.offset) && m.offset(c, d) || m.offset;o.each(m.axis.split(""), function (e, t) {
                    var i = "x" === t ? "Left" : "Top",
                        n = i.toLowerCase(),
                        o = "scroll" + i,
                        r = u[o](),
                        s = v.max(c, t);a ? (h[o] = a[n] + (l ? 0 : r - u.offset()[n]), m.margin && (h[o] -= parseInt(d.css("margin" + i), 10) || 0, h[o] -= parseInt(d.css("border" + i + "Width"), 10) || 0), h[o] += f[n] || 0, m.over[n] && (h[o] += d["x" === t ? "width" : "height"]() * m.over[n])) : (n = d[n], h[o] = n.slice && "%" === n.slice(-1) ? parseFloat(n) / 100 * s : n), m.limit && /^\d+$/.test(h[o]) && (h[o] = h[o] <= 0 ? 0 : Math.min(h[o], s)), !e && 1 < m.axis.length && (r === h[o] ? h = {} : g && (p(m.onAfterFirst), h = {}));
                }), p(m.onAfter);
            }function p(e) {
                var t = o.extend({}, m, { queue: !0, duration: i, complete: e && function () {
                        e.call(c, d, m);
                    } });u.animate(h, t);
            }
        });
    }, v.max = function (e, t) {
        var i = "x" === t ? "Width" : "Height",
            n = "scroll" + i;if (!r(e)) return e[n] - o(e)[i.toLowerCase()]();t = "client" + i, i = e.ownerDocument || e.document, e = i.documentElement, i = i.body;return Math.max(e[n], i[n]) - Math.min(e[t], i[t]);
    }, o.Tween.propHooks.scrollLeft = o.Tween.propHooks.scrollTop = { get: function get(e) {
            return o(e.elem)[e.prop]();
        }, set: function set(e) {
            var t = this.get(e);if (e.options.interrupt && e._last && e._last !== t) return o(e.elem).stop();var i = Math.round(e.now);t !== i && (o(e.elem)[e.prop](i), e._last = this.get(e));
        } }, v;
}), function (e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "undefined" != typeof exports ? module.exports = t() : e.Papa = t();
}(this, function o() {
    "use strict";
    var r = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== r ? r : {};var u,
        s = !r.document && !!r.postMessage,
        a = s && /blob:/i.test((r.location || {}).protocol),
        l = {},
        c = 0,
        _ = {};function d(e) {
        this._handle = null, this._finished = !1, this._completed = !1, this._halted = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = { data: [], errors: [], meta: {} }, function (e) {
            var t = x(e);t.chunkSize = parseInt(t.chunkSize), e.step || e.chunk || (t.chunkSize = null);this._handle = new i(t), (this._handle.streamer = this)._config = t;
        }.call(this, e), this.parseChunk = function (e, t) {
            this.isFirstChunk && q(this._config.beforeFirstChunk) && void 0 !== (n = this._config.beforeFirstChunk(e)) && (e = n), this.isFirstChunk = !1, this._halted = !1;var i = this._partialLine + e;this._partialLine = "";var n = this._handle.parse(i, this._baseIndex, !this._finished);if (!this._handle.paused() && !this._handle.aborted()) {
                e = n.meta.cursor;this._finished || (this._partialLine = i.substring(e - this._baseIndex), this._baseIndex = e), n && n.data && (this._rowCount += n.data.length);e = this._finished || this._config.preview && this._rowCount >= this._config.preview;if (a) r.postMessage({ results: n, workerId: _.WORKER_ID, finished: e });else if (q(this._config.chunk) && !t) {
                    if (this._config.chunk(n, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = !0);this._completeResults = n = void 0;
                }return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(n.data), this._completeResults.errors = this._completeResults.errors.concat(n.errors), this._completeResults.meta = n.meta), this._completed || !e || !q(this._config.complete) || n && n.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = !0), e || n && n.meta.paused || this._nextChunk(), n;
            }this._halted = !0;
        }, this._sendError = function (e) {
            q(this._config.error) ? this._config.error(e) : a && this._config.error && r.postMessage({ workerId: _.WORKER_ID, error: e, finished: !1 });
        };
    }function h(e) {
        var n;(e = e || {}).chunkSize || (e.chunkSize = _.RemoteChunkSize), d.call(this, e), this._nextChunk = s ? function () {
            this._readChunk(), this._chunkLoaded();
        } : function () {
            this._readChunk();
        }, this.stream = function (e) {
            this._input = e, this._nextChunk();
        }, this._readChunk = function () {
            if (this._finished) this._chunkLoaded();else {
                if (n = new XMLHttpRequest(), this._config.withCredentials && (n.withCredentials = this._config.withCredentials), s || (n.onload = E(this._chunkLoaded, this), n.onerror = E(this._chunkError, this)), n.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !s), this._config.downloadRequestHeaders) {
                    var e,
                        t = this._config.downloadRequestHeaders;for (e in t) {
                        n.setRequestHeader(e, t[e]);
                    }
                }var i;this._config.chunkSize && (i = this._start + this._config.chunkSize - 1, n.setRequestHeader("Range", "bytes=" + this._start + "-" + i));try {
                    n.send(this._config.downloadRequestBody);
                } catch (e) {
                    this._chunkError(e.message);
                }s && 0 === n.status && this._chunkError();
            }
        }, this._chunkLoaded = function () {
            4 === n.readyState && (n.status < 200 || 400 <= n.status ? this._chunkError() : (this._start += this._config.chunkSize || n.responseText.length, this._finished = !this._config.chunkSize || this._start >= function (e) {
                e = e.getResponseHeader("Content-Range");return null !== e ? parseInt(e.substring(e.lastIndexOf("/") + 1)) : -1;
            }(n), this.parseChunk(n.responseText)));
        }, this._chunkError = function (e) {
            e = n.statusText || e;this._sendError(new Error(e));
        };
    }function f(e) {
        var i, n;(e = e || {}).chunkSize || (e.chunkSize = _.LocalChunkSize), d.call(this, e);var o = "undefined" != typeof FileReader;this.stream = function (e) {
            this._input = e, n = e.slice || e.webkitSlice || e.mozSlice, o ? ((i = new FileReader()).onload = E(this._chunkLoaded, this), i.onerror = E(this._chunkError, this)) : i = new FileReaderSync(), this._nextChunk();
        }, this._nextChunk = function () {
            this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
        }, this._readChunk = function () {
            var e,
                t = this._input;this._config.chunkSize && (e = Math.min(this._start + this._config.chunkSize, this._input.size), t = n.call(t, this._start, e));t = i.readAsText(t, this._config.encoding);o || this._chunkLoaded({ target: { result: t } });
        }, this._chunkLoaded = function (e) {
            this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(e.target.result);
        }, this._chunkError = function () {
            this._sendError(i.error);
        };
    }function p(e) {
        var i;d.call(this, e = e || {}), this.stream = function (e) {
            return i = e, this._nextChunk();
        }, this._nextChunk = function () {
            if (!this._finished) {
                var e,
                    t = this._config.chunkSize;return i = t ? (e = i.substring(0, t), i.substring(t)) : (e = i, ""), this._finished = !i, this.parseChunk(e);
            }
        };
    }function m(e) {
        d.call(this, e = e || {});var t = [],
            i = !0,
            n = !1;this.pause = function () {
            d.prototype.pause.apply(this, arguments), this._input.pause();
        }, this.resume = function () {
            d.prototype.resume.apply(this, arguments), this._input.resume();
        }, this.stream = function (e) {
            this._input = e, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
        }, this._checkIsFinished = function () {
            n && 1 === t.length && (this._finished = !0);
        }, this._nextChunk = function () {
            this._checkIsFinished(), t.length ? this.parseChunk(t.shift()) : i = !0;
        }, this._streamData = E(function (e) {
            try {
                t.push("string" == typeof e ? e : e.toString(this._config.encoding)), i && (i = !1, this._checkIsFinished(), this.parseChunk(t.shift()));
            } catch (e) {
                this._streamError(e);
            }
        }, this), this._streamError = E(function (e) {
            this._streamCleanUp(), this._sendError(e);
        }, this), this._streamEnd = E(function () {
            this._streamCleanUp(), n = !0, this._streamData("");
        }, this), this._streamCleanUp = E(function () {
            this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
        }, this);
    }function g(e) {
        var t = require("stream").Duplex,
            i = x(e),
            n = !0,
            o = !1,
            r = [],
            s = null;this._onCsvData = function (e) {
            e = e.data;s.push(e) || this._handle.paused() || this._handle.pause();
        }, this._onCsvComplete = function () {
            s.push(null);
        }, i.step = E(this._onCsvData, this), i.complete = E(this._onCsvComplete, this), d.call(this, i), this._nextChunk = function () {
            o && 1 === r.length && (this._finished = !0), r.length ? r.shift()() : n = !0;
        }, this._addToParseQueue = function (e, t) {
            r.push(E(function () {
                if (this.parseChunk("string" == typeof e ? e : e.toString(i.encoding)), q(t)) return t();
            }, this)), n && (n = !1, this._nextChunk());
        }, this._onRead = function () {
            this._handle.paused() && this._handle.resume();
        }, this._onWrite = function (e, t, i) {
            this._addToParseQueue(e, i);
        }, this._onWriteComplete = function () {
            o = !0, this._addToParseQueue("");
        }, this.getStream = function () {
            return s;
        }, (s = new t({ readableObjectMode: !0, decodeStrings: !1, read: E(this._onRead, this), write: E(this._onWrite, this) })).once("finish", E(this._onWriteComplete, this));
    }function i(v) {
        var r,
            s,
            a,
            t,
            l = Math.pow(2, 53),
            c = -l,
            u = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)(e[-+]?\d+)?\s*$/,
            d = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
            i = this,
            n = 0,
            h = 0,
            f = !1,
            e = !1,
            p = [],
            m = { data: [], errors: [], meta: {} };function y(e) {
            return "greedy" === v.skipEmptyLines ? "" === e.join("").trim() : 1 === e.length && 0 === e[0].length;
        }function g() {
            if (m && a && (b("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + _.DefaultDelimiter + "'"), a = !1), v.skipEmptyLines) for (var e = 0; e < m.data.length; e++) {
                y(m.data[e]) && m.data.splice(e--, 1);
            }return o() && function () {
                if (m) if (Array.isArray(m.data[0])) {
                    for (var e = 0; o() && e < m.data.length; e++) {
                        m.data[e].forEach(t);
                    }m.data.splice(0, 1);
                } else m.data.forEach(t);function t(e, t) {
                    q(v.transformHeader) && (e = v.transformHeader(e, t)), p.push(e);
                }
            }(), function () {
                if (!m || !v.header && !v.dynamicTyping && !v.transform) return m;function e(e, t) {
                    for (var i = v.header ? {} : [], n = 0; n < e.length; n++) {
                        var o = n,
                            r = e[n],
                            r = function (e, t) {
                            if (function (e) {
                                v.dynamicTypingFunction && void 0 === v.dynamicTyping[e] && (v.dynamicTyping[e] = v.dynamicTypingFunction(e));return !0 === (v.dynamicTyping[e] || v.dynamicTyping);
                            }(e)) return "true" === t || "TRUE" === t || "false" !== t && "FALSE" !== t && (function (e) {
                                if (u.test(e)) {
                                    e = parseFloat(e);if (c < e && e < l) return 1;
                                }
                            }(t) ? parseFloat(t) : d.test(t) ? new Date(t) : "" === t ? null : t);return t;
                        }(o = v.header ? n >= p.length ? "__parsed_extra" : p[n] : o, r = v.transform ? v.transform(r, o) : r);"__parsed_extra" === o ? (i[o] = i[o] || [], i[o].push(r)) : i[o] = r;
                    }return v.header && (n > p.length ? b("FieldMismatch", "TooManyFields", "Too many fields: expected " + p.length + " fields but parsed " + n, h + t) : n < p.length && b("FieldMismatch", "TooFewFields", "Too few fields: expected " + p.length + " fields but parsed " + n, h + t)), i;
                }var t = 1;!m.data.length || Array.isArray(m.data[0]) ? (m.data = m.data.map(e), t = m.data.length) : m.data = e(m.data, 0);v.header && m.meta && (m.meta.fields = p);return h += t, m;
            }();
        }function o() {
            return v.header && 0 === p.length;
        }function b(e, t, i, n) {
            i = { type: e, code: t, message: i };void 0 !== n && (i.row = n), m.errors.push(i);
        }q(v.step) && (t = v.step, v.step = function (e) {
            m = e, o() ? g() : (g(), 0 !== m.data.length && (n += e.data.length, v.preview && n > v.preview ? s.abort() : (m.data = m.data[0], t(m, i))));
        }), this.parse = function (e, t, i) {
            var n = v.quoteChar || '"';v.newline || (v.newline = function (e, t) {
                e = e.substring(0, 1048576);var t = new RegExp(R(t) + "([^]*?)" + R(t), "gm"),
                    i = (e = e.replace(t, "")).split("\r"),
                    e = e.split("\n"),
                    e = 1 < e.length && e[0].length < i[0].length;if (1 === i.length || e) return "\n";for (var n = 0, o = 0; o < i.length; o++) {
                    "\n" === i[o][0] && n++;
                }return n >= i.length / 2 ? "\r\n" : "\r";
            }(e, n)), a = !1, v.delimiter ? q(v.delimiter) && (v.delimiter = v.delimiter(e), m.meta.delimiter = v.delimiter) : ((o = function (e, t, i, n, o) {
                var r, s, a, l;o = o || [",", "\t", "|", ";", _.RECORD_SEP, _.UNIT_SEP];for (var c = 0; c < o.length; c++) {
                    var u = o[c],
                        d = 0,
                        h = 0,
                        f = 0;a = void 0;for (var p, m = new w({ comments: n, delimiter: u, newline: t, preview: 10 }).parse(e), g = 0; g < m.data.length; g++) {
                        i && y(m.data[g]) ? f++ : (p = m.data[g].length, h += p, void 0 !== a ? 0 < p && (d += Math.abs(p - a), a = p) : a = p);
                    }0 < m.data.length && (h /= m.data.length - f), (void 0 === s || d <= s) && (void 0 === l || l < h) && 1.99 < h && (s = d, r = u, l = h);
                }return { successful: !!(v.delimiter = r), bestDelimiter: r };
            }(e, v.newline, v.skipEmptyLines, v.comments, v.delimitersToGuess)).successful ? v.delimiter = o.bestDelimiter : (a = !0, v.delimiter = _.DefaultDelimiter), m.meta.delimiter = v.delimiter);var o = x(v);return v.preview && v.header && o.preview++, r = e, s = new w(o), m = s.parse(r, t, i), g(), f ? { meta: { paused: !0 } } : m || { meta: { paused: !1 } };
        }, this.paused = function () {
            return f;
        }, this.pause = function () {
            f = !0, s.abort(), r = q(v.chunk) ? "" : r.substring(s.getCharIndex());
        }, this.resume = function () {
            i.streamer._halted ? (f = !1, i.streamer.parseChunk(r, !0)) : setTimeout(i.resume, 3);
        }, this.aborted = function () {
            return e;
        }, this.abort = function () {
            e = !0, s.abort(), m.meta.aborted = !0, q(v.complete) && v.complete(m), r = "";
        };
    }function R(e) {
        return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }function w(e) {
        var T = (e = e || {}).delimiter,
            S = e.newline,
            D = e.comments,
            A = e.step,
            L = e.preview,
            N = e.fastMode,
            I = void 0 === e.quoteChar ? '"' : e.quoteChar,
            P = I;if (void 0 !== e.escapeChar && (P = e.escapeChar), ("string" != typeof T || -1 < _.BAD_DELIMITERS.indexOf(T)) && (T = ","), D === T) throw new Error("Comment character same as delimiter");!0 === D ? D = "#" : ("string" != typeof D || -1 < _.BAD_DELIMITERS.indexOf(D)) && (D = !1), "\n" !== S && "\r" !== S && "\r\n" !== S && (S = "\n");var j = 0,
            O = !1;this.parse = function (a, t, i) {
            if ("string" != typeof a) throw new Error("Input must be a string");var n = a.length,
                e = T.length,
                o = S.length,
                r = D.length,
                s = q(A),
                l = [],
                c = [],
                u = [],
                d = j = 0;if (!a) return C();if (N || !1 !== N && -1 === a.indexOf(I)) {
                for (var h = a.split(S), f = 0; f < h.length; f++) {
                    if (u = h[f], j += u.length, f !== h.length - 1) j += S.length;else if (i) return C();if (!D || u.substring(0, r) !== D) {
                        if (s) {
                            if (l = [], _(u.split(T)), k(), O) return C();
                        } else _(u.split(T));if (L && L <= f) return l = l.slice(0, L), C(!0);
                    }
                }return C();
            }for (var p = a.indexOf(T, j), m = a.indexOf(S, j), g = new RegExp(R(P) + R(I), "g"), v = a.indexOf(I, j);;) {
                if (a[j] !== I) {
                    if (D && 0 === u.length && a.substring(j, j + r) === D) {
                        if (-1 === m) return C();j = m + o, m = a.indexOf(S, j), p = a.indexOf(T, j);
                    } else {
                        if (-1 !== p && (p < m || -1 === m)) {
                            if (!(p < v)) {
                                u.push(a.substring(j, p)), j = p + e, p = a.indexOf(T, j);continue;
                            }var y = function e(t, i, n) {
                                var o = { nextDelim: void 0, quoteSearch: void 0 };var r = a.indexOf(I, i + 1);if (i < t && t < r && (r < n || -1 === n)) {
                                    var s = a.indexOf(T, r);if (-1 === s) return o;r < s && (r = a.indexOf(I, r + 1)), o = e(s, r, n);
                                } else o = { nextDelim: t, quoteSearch: i };return o;
                            }(p, v, m);if (y && void 0 !== y.nextDelim) {
                                p = y.nextDelim, v = y.quoteSearch, u.push(a.substring(j, p)), j = p + e, p = a.indexOf(T, j);continue;
                            }
                        }if (-1 === m) break;if (u.push(a.substring(j, m)), E(m + o), s && (k(), O)) return C();if (L && l.length >= L) return C(!0);
                    }
                } else for (v = j, j++;;) {
                    if (-1 === (v = a.indexOf(I, v + 1))) return i || c.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: l.length, index: j }), x();if (v === n - 1) return x(a.substring(j, v).replace(g, I));if (I !== P || a[v + 1] !== P) {
                        if (I === P || 0 === v || a[v - 1] !== P) {
                            -1 !== p && p < v + 1 && (p = a.indexOf(T, v + 1));var b = w(-1 === (m = -1 !== m && m < v + 1 ? a.indexOf(S, v + 1) : m) ? p : Math.min(p, m));if (a[v + 1 + b] === T) {
                                u.push(a.substring(j, v).replace(g, I)), a[j = v + 1 + b + e] !== I && (v = a.indexOf(I, j)), p = a.indexOf(T, j), m = a.indexOf(S, j);break;
                            }b = w(m);if (a.substring(v + 1 + b, v + 1 + b + o) === S) {
                                if (u.push(a.substring(j, v).replace(g, I)), E(v + 1 + b + o), p = a.indexOf(T, j), v = a.indexOf(I, j), s && (k(), O)) return C();if (L && l.length >= L) return C(!0);break;
                            }c.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: l.length, index: j }), v++;
                        }
                    } else v++;
                }
            }return x();function _(e) {
                l.push(e), d = j;
            }function w(e) {
                var t = 0;return -1 === e || (e = a.substring(v + 1, e)) && "" === e.trim() && (t = e.length), t;
            }function x(e) {
                return i || (void 0 === e && (e = a.substring(j)), u.push(e), j = n, _(u), s && k()), C();
            }function E(e) {
                j = e, _(u), u = [], m = a.indexOf(S, j);
            }function C(e) {
                return { data: l, errors: c, meta: { delimiter: T, linebreak: S, aborted: O, truncated: !!e, cursor: d + (t || 0) } };
            }function k() {
                A(C()), l = [], c = [];
            }
        }, this.abort = function () {
            O = !0;
        }, this.getCharIndex = function () {
            return j;
        };
    }function v(e) {
        var t = e.data,
            i = l[t.workerId],
            n = !1;if (t.error) i.userError(t.error, t.file);else if (t.results && t.results.data) {
            var o = { abort: function abort() {
                    n = !0, y(t.workerId, { data: [], errors: [], meta: { aborted: !0 } });
                }, pause: b, resume: b };if (q(i.userStep)) {
                for (var r = 0; r < t.results.data.length && (i.userStep({ data: t.results.data[r], errors: t.results.errors, meta: t.results.meta }, o), !n); r++) {}delete t.results;
            } else q(i.userChunk) && (i.userChunk(t.results, o, t.file), delete t.results);
        }t.finished && !n && y(t.workerId, t.results);
    }function y(e, t) {
        var i = l[e];q(i.userComplete) && i.userComplete(t), i.terminate(), delete l[e];
    }function b() {
        throw new Error("Not implemented.");
    }function x(e) {
        if ("object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) || null === e) return e;var t,
            i = Array.isArray(e) ? [] : {};for (t in e) {
            i[t] = x(e[t]);
        }return i;
    }function E(e, t) {
        return function () {
            e.apply(t, arguments);
        };
    }function q(e) {
        return "function" == typeof e;
    }return _.parse = function (e, t) {
        var i = (t = t || {}).dynamicTyping || !1;q(i) && (t.dynamicTypingFunction = i, i = {});if (t.dynamicTyping = i, t.transform = !!q(t.transform) && t.transform, !t.worker || !_.WORKERS_SUPPORTED) {
            var n = null;return e === _.NODE_STREAM_INPUT && "undefined" == typeof PAPA_BROWSER_CONTEXT ? (n = new g(t)).getStream() : ("string" == typeof e ? n = new (t.download ? h : p)(t) : !0 === e.readable && q(e.read) && q(e.on) ? n = new m(t) : (r.File && e instanceof File || e instanceof Object) && (n = new f(t)), n.stream(e));
        }n = function () {
            if (!_.WORKERS_SUPPORTED) return !1;var e = function () {
                var e = r.URL || r.webkitURL || null,
                    t = o.toString();return _.BLOB_URL || (_.BLOB_URL = e.createObjectURL(new Blob(["(", t, ")();"], { type: "text/javascript" })));
            }(),
                e = new r.Worker(e);return e.onmessage = v, e.id = c++, l[e.id] = e;
        }();n.userStep = t.step, n.userChunk = t.chunk, n.userComplete = t.complete, n.userError = t.error, t.step = q(t.step), t.chunk = q(t.chunk), t.complete = q(t.complete), t.error = q(t.error), delete t.worker, n.postMessage({ input: e, config: t, workerId: n.id });
    }, _.unparse = function (e, t) {
        var n = !1,
            g = !0,
            v = ",",
            y = "\r\n",
            o = '"',
            r = o + o,
            i = !1,
            s = null,
            a = !1;!function () {
            if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) {
                if ("string" != typeof t.delimiter || _.BAD_DELIMITERS.filter(function (e) {
                    return -1 !== t.delimiter.indexOf(e);
                }).length || (v = t.delimiter), "boolean" != typeof t.quotes && "function" != typeof t.quotes && !Array.isArray(t.quotes) || (n = t.quotes), "boolean" != typeof t.skipEmptyLines && "string" != typeof t.skipEmptyLines || (i = t.skipEmptyLines), "string" == typeof t.newline && (y = t.newline), "string" == typeof t.quoteChar && (o = t.quoteChar), "boolean" == typeof t.header && (g = t.header), Array.isArray(t.columns)) {
                    if (0 === t.columns.length) throw new Error("Option columns is empty");s = t.columns;
                }void 0 !== t.escapeChar && (r = t.escapeChar + o), "boolean" == typeof t.escapeFormulae && (a = t.escapeFormulae);
            }
        }();var l = new RegExp(R(o), "g");"string" == typeof e && (e = JSON.parse(e));if (Array.isArray(e)) {
            if (!e.length || Array.isArray(e[0])) return u(null, e, i);if ("object" == _typeof(e[0])) return u(s || c(e[0]), e, i);
        } else if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) return "string" == typeof e.data && (e.data = JSON.parse(e.data)), Array.isArray(e.data) && (e.fields || (e.fields = e.meta && e.meta.fields), e.fields || (e.fields = Array.isArray(e.data[0]) ? e.fields : c(e.data[0])), Array.isArray(e.data[0]) || "object" == _typeof(e.data[0]) || (e.data = [e.data])), u(e.fields || [], e.data || [], i);throw new Error("Unable to serialize unrecognized input");function c(e) {
            if ("object" != (typeof e === "undefined" ? "undefined" : _typeof(e))) return [];var t,
                i = [];for (t in e) {
                i.push(t);
            }return i;
        }function u(e, t, i) {
            var n = "";"string" == typeof e && (e = JSON.parse(e)), "string" == typeof t && (t = JSON.parse(t));var o = Array.isArray(e) && 0 < e.length,
                r = !Array.isArray(t[0]);if (o && g) {
                for (var s = 0; s < e.length; s++) {
                    0 < s && (n += v), n += b(e[s], s);
                }0 < t.length && (n += y);
            }for (var a = 0; a < t.length; a++) {
                var l = (o ? e : t[a]).length,
                    c = !1,
                    u = o ? 0 === Object.keys(t[a]).length : 0 === t[a].length;if (i && !o && (c = "greedy" === i ? "" === t[a].join("").trim() : 1 === t[a].length && 0 === t[a][0].length), "greedy" === i && o) {
                    for (var d = [], h = 0; h < l; h++) {
                        var f = r ? e[h] : h;d.push(t[a][f]);
                    }c = "" === d.join("").trim();
                }if (!c) {
                    for (var p = 0; p < l; p++) {
                        0 < p && !u && (n += v);var m = o && r ? e[p] : p;n += b(t[a][m], p);
                    }a < t.length - 1 && (!i || 0 < l && !u) && (n += y);
                }
            }return n;
        }function b(e, t) {
            if (null == e) return "";if (e.constructor === Date) return JSON.stringify(e).slice(1, 25);var i = (e = !0 === a && "string" == typeof e && null !== e.match(/^[=+\-@].*$/) ? "'" + e : e).toString().replace(l, r);return "boolean" == typeof n && n || "function" == typeof n && n(e, t) || Array.isArray(n) && n[t] || function (e, t) {
                for (var i = 0; i < t.length; i++) {
                    if (-1 < e.indexOf(t[i])) return !0;
                }return !1;
            }(i, _.BAD_DELIMITERS) || -1 < i.indexOf(v) || " " === i.charAt(0) || " " === i.charAt(i.length - 1) ? o + i + o : i;
        }
    }, _.RECORD_SEP = String.fromCharCode(30), _.UNIT_SEP = String.fromCharCode(31), _.BYTE_ORDER_MARK = "\uFEFF", _.BAD_DELIMITERS = ["\r", "\n", '"', _.BYTE_ORDER_MARK], _.WORKERS_SUPPORTED = !s && !!r.Worker, _.NODE_STREAM_INPUT = 1, _.LocalChunkSize = 10485760, _.RemoteChunkSize = 5242880, _.DefaultDelimiter = ",", _.Parser = w, _.ParserHandle = i, _.NetworkStreamer = h, _.FileStreamer = f, _.StringStreamer = p, _.ReadableStreamStreamer = m, "undefined" == typeof PAPA_BROWSER_CONTEXT && (_.DuplexStreamStreamer = g), r.jQuery && ((u = r.jQuery).fn.parse = function (a) {
        var i = a.config || {},
            l = [];return this.each(function (e) {
            if (!("INPUT" === u(this).prop("tagName").toUpperCase() && "file" === u(this).attr("type").toLowerCase() && r.FileReader) || !this.files || 0 === this.files.length) return !0;for (var t = 0; t < this.files.length; t++) {
                l.push({ file: this.files[t], inputElem: this, instanceConfig: u.extend({}, i) });
            }
        }), e(), this;function e() {
            if (0 !== l.length) {
                var e,
                    t,
                    i,
                    n,
                    o = l[0];if (q(a.before)) {
                    var r = a.before(o.file, o.inputElem);if ("object" == (typeof r === "undefined" ? "undefined" : _typeof(r))) {
                        if ("abort" === r.action) return e = "AbortError", t = o.file, i = o.inputElem, n = r.reason, void (q(a.error) && a.error({ name: e }, t, i, n));if ("skip" === r.action) return void c();"object" == _typeof(r.config) && (o.instanceConfig = u.extend(o.instanceConfig, r.config));
                    } else if ("skip" === r) return void c();
                }var s = o.instanceConfig.complete;o.instanceConfig.complete = function (e) {
                    q(s) && s(e, o.file, o.inputElem), c();
                }, _.parse(o.file, o.instanceConfig);
            } else q(a.complete) && a.complete();
        }function c() {
            l.splice(0, 1), e();
        }
    }), a && (r.onmessage = function (e) {
        e = e.data;void 0 === _.WORKER_ID && e && (_.WORKER_ID = e.workerId);"string" == typeof e.input ? r.postMessage({ workerId: _.WORKER_ID, results: _.parse(e.input, e.config), finished: !0 }) : !(r.File && e.input instanceof File || e.input instanceof Object) || (e = _.parse(e.input, e.config)) && r.postMessage({ workerId: _.WORKER_ID, results: e, finished: !0 });
    }), (h.prototype = Object.create(d.prototype)).constructor = h, (f.prototype = Object.create(d.prototype)).constructor = f, (p.prototype = Object.create(p.prototype)).constructor = p, (m.prototype = Object.create(d.prototype)).constructor = m, "undefined" == typeof PAPA_BROWSER_CONTEXT && ((g.prototype = Object.create(d.prototype)).constructor = g), _;
}), function (a) {
    "use strict";
    var l = {},
        o = ["xs", "sm", "md", "lg", "xl", "xxl"];function e() {
        var e = a("body");1 != a(".lv-screen-data").length && e.append('<div class="lv-screen-data"></div>');var t,
            i,
            n = window.innerWidth,
            o = window.innerHeight,
            r = a(window).width(),
            s = a(window).height();n < l.sm && (t = "xs"), n >= l.sm && n < l.md && (t = "sm"), n >= l.md && n < l.lg && (t = "md"), n >= l.lg && n < l.xl && (t = "lg"), n >= l.xl && n < l.xxl && (t = "xl"), n >= l.xxl && (t = "xxl"), r < l.sm && (i = "xs"), r >= l.sm && r < l.md && (i = "sm"), r >= l.md && r < l.lg && (i = "md"), r >= l.lg && r < l.xl && (i = "lg"), r >= l.xl && r < l.xxl && (i = "xl"), r >= l.xxl && (i = "xxl"), a(".lv-screen-data").html(r + " x " + s + "<br><small>" + n + " x " + o + "</small><br>" + t + "  [" + i + "]").css({ position: "fixed", top: 0, padding: "5px 10px", background: "rgba(0,0,0,0.5)", "font-family": "Helvetica Neue", "font-size": "14px", color: "white", "z-index": 2147483646 }).click(function () {
            e.toggleClass("developer");
        });
    }!function () {
        for (var e, t = "", i = window.getComputedStyle(document.getElementsByTagName("body")[0]).getPropertyValue("content").replace(/\\a/g, "").replace(/ /g, "").replace(/'/g, "").replace(/"/g, "").split("|"), n = 0; n < i.length; n++) {
            l[o[n]] = Number(i[n].replace("px", "")), t += "<tr><td>" + o[n] + "</td><td>" + i[n] + "</td></tr>";
        }e = '<table class="table breakpoints-table" style="width: 300px;">' + t + "</table>", a('[data-js="lv-responsive-table"]').append(e);
    }(), a("html[development]").length && (e(), a(window).resize(function () {
        e();
    }));
}(jQuery), function () {
    "use strict";
    var e = jQuery(".lv-google-map");e.length && (e.click(function () {
        e.find("iframe").css("pointer-events", "auto");
    }), e.mouseleave(function () {
        e.find("iframe").css("pointer-events", "none");
    }));
}(), function () {
    "use strict";
    function n() {
        function e() {
            var n = { width: s.width / s.naturalWidth, height: s.height / s.naturalHeight };r.forEach(function (e, t) {
                var i = 0;o[t].coords = e.split(",").map(function (e) {
                    var t = 1 == (i = 1 - i) ? "width" : "height";return Math.floor(Number(e) * n[t]);
                }).join(",");
            });
        }function t(e) {
            return e.coords.replace(/ *, */g, ",").replace(/ +/g, ",");
        }function i() {
            clearTimeout(a), a = setTimeout(e, 250);
        }var n = this,
            o = null,
            r = null,
            s = null,
            a = null;"function" == typeof n._resize ? n._resize() : (o = n.getElementsByTagName("area"), r = Array.prototype.map.call(o, t), s = document.querySelector('img[usemap="#' + n.name + '"]'), n._resize = e, s.addEventListener("load", e, !1), window.addEventListener("focus", e, !1), window.addEventListener("resize", i, !1), window.addEventListener("readystatechange", e, !1), document.addEventListener("fullscreenchange", e, !1), s.width === s.naturalWidth && s.height === s.naturalHeight || e());
    }function e() {
        function t(e) {
            e && (function (e) {
                if (!e.tagName) throw new TypeError("Object is not a valid DOM element");if ("MAP" !== e.tagName.toUpperCase()) throw new TypeError("Expected <MAP> tag, found <" + e.tagName + ">.");
            }(e), n.call(e), i.push(e));
        }var i;return function (e) {
            switch (i = [], typeof e === "undefined" ? "undefined" : _typeof(e)) {case "undefined":case "string":
                    Array.prototype.forEach.call(document.querySelectorAll(e || "map"), t);break;case "object":
                    t(e);break;default:
                    throw new TypeError("Unexpected data type (" + (typeof e === "undefined" ? "undefined" : _typeof(e)) + ").");}return i;
        };
    }"function" == typeof define && define.amd ? define([], e) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = e() : window.imageMapResize = e(), "jQuery" in window && (jQuery.fn.imageMapResize = function () {
        return this.filter("map").each(n).end();
    });
}(), function (l, c) {
    "use strict";
    function u(e, t) {
        for (var i in t) {
            t.hasOwnProperty(i) && (e[i] = t[i]);
        }
    }function d(e) {
        return parseFloat(e) || 0;
    }function h(e) {
        for (var t = 0; e;) {
            t += e.offsetTop, e = e.offsetParent;
        }return t;
    }function e() {
        function e() {
            l.pageXOffset != s.left ? (s.top = l.pageYOffset, s.left = l.pageXOffset, g.refreshAll()) : l.pageYOffset != s.top && (s.top = l.pageYOffset, s.left = l.pageXOffset, a.forEach(function (e) {
                return e._recalcPosition();
            }));
        }function t() {
            i = setInterval(function () {
                a.forEach(function (e) {
                    return e._fastCheck();
                });
            }, 500);
        }var i, n, o;r || (r = !0, e(), l.addEventListener("scroll", e), l.addEventListener("resize", g.refreshAll), l.addEventListener("orientationchange", g.refreshAll), o = n = i = void 0, "hidden" in c ? (n = "hidden", o = "visibilitychange") : "webkitHidden" in c && (n = "webkitHidden", o = "webkitvisibilitychange"), o ? (c[n] || t(), c.addEventListener(o, function () {
            c[n] ? clearInterval(i) : t();
        })) : t());
    }var t,
        i = function i(e, t, _i) {
        return t && o(e.prototype, t), _i && o(e, _i), e;
    },
        f = !1,
        n = void 0 !== l;function o(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
    }n && l.getComputedStyle ? (t = c.createElement("div"), ["", "-webkit-", "-moz-", "-ms-"].some(function (e) {
        try {
            t.style.position = e + "sticky";
        } catch (e) {}return "" != t.style.position;
    }) && (f = !0)) : f = !0;var r = !1,
        p = "undefined" != typeof ShadowRoot,
        s = { top: null, left: null },
        a = [],
        m = (i(v, [{ key: "refresh", value: function value() {
            var e, t, i, n, o, r, s, a;f || this._removed || (this._active && this._deactivate(), e = this._node, t = { position: (s = getComputedStyle(e)).position, top: s.top, display: s.display, marginTop: s.marginTop, marginBottom: s.marginBottom, marginLeft: s.marginLeft, marginRight: s.marginRight, cssFloat: s.cssFloat }, isNaN(parseFloat(t.top)) || "table-cell" == t.display || "none" == t.display || (this._active = !0, r = e.style.position, "sticky" != s.position && "-webkit-sticky" != s.position || (e.style.position = "static"), i = e.parentNode, a = p && i instanceof ShadowRoot ? i.host : i, n = e.getBoundingClientRect(), o = a.getBoundingClientRect(), s = getComputedStyle(a), this._parent = { node: a, styles: { position: a.style.position }, offsetHeight: a.offsetHeight }, this._offsetToWindow = { left: n.left, right: c.documentElement.clientWidth - n.right }, this._offsetToParent = { top: n.top - o.top - d(s.borderTopWidth), left: n.left - o.left - d(s.borderLeftWidth), right: -n.right + o.right - d(s.borderRightWidth) }, this._styles = { position: r, top: e.style.top, bottom: e.style.bottom, left: e.style.left, right: e.style.right, width: e.style.width, marginTop: e.style.marginTop, marginLeft: e.style.marginLeft, marginRight: e.style.marginRight }, r = d(t.top), this._limits = { start: n.top + l.pageYOffset - r, end: o.top + l.pageYOffset + a.offsetHeight - d(s.borderBottomWidth) - e.offsetHeight - r - d(t.marginBottom) }, "absolute" != (s = s.position) && "relative" != s && (a.style.position = "relative"), this._recalcPosition(), (a = this._clone = {}).node = c.createElement("div"), u(a.node.style, { width: n.right - n.left + "px", height: n.bottom - n.top + "px", marginTop: t.marginTop, marginBottom: t.marginBottom, marginLeft: t.marginLeft, marginRight: t.marginRight, cssFloat: t.cssFloat, padding: 0, border: 0, borderSpacing: 0, fontSize: "1em", position: "static" }), i.insertBefore(a.node, e), a.docOffsetTop = h(a.node)));
        } }, { key: "_recalcPosition", value: function value() {
            if (this._active && !this._removed) {
                var e = s.top <= this._limits.start ? "start" : s.top >= this._limits.end ? "end" : "middle";if (this._stickyMode != e) {
                    switch (e) {case "start":
                            u(this._node.style, { position: "absolute", left: this._offsetToParent.left + "px", right: this._offsetToParent.right + "px", top: this._offsetToParent.top + "px", bottom: "auto", width: "auto", marginLeft: 0, marginRight: 0, marginTop: 0 });break;case "middle":
                            u(this._node.style, { position: "fixed", left: this._offsetToWindow.left + "px", right: this._offsetToWindow.right + "px", top: this._styles.top, bottom: "auto", width: "auto", marginLeft: 0, marginRight: 0, marginTop: 0 });break;case "end":
                            u(this._node.style, { position: "absolute", left: this._offsetToParent.left + "px", right: this._offsetToParent.right + "px", top: "auto", bottom: 0, width: "auto", marginLeft: 0, marginRight: 0 });}this._stickyMode = e;
                }
            }
        } }, { key: "_fastCheck", value: function value() {
            this._active && !this._removed && (1 < Math.abs(h(this._clone.node) - this._clone.docOffsetTop) || 1 < Math.abs(this._parent.node.offsetHeight - this._parent.offsetHeight)) && this.refresh();
        } }, { key: "_deactivate", value: function value() {
            var t = this;this._active && !this._removed && (this._clone.node.parentNode.removeChild(this._clone.node), delete this._clone, u(this._node.style, this._styles), delete this._styles, a.some(function (e) {
                return e !== t && e._parent && e._parent.node === t._parent.node;
            }) || u(this._parent.node.style, this._parent.styles), delete this._parent, this._stickyMode = null, this._active = !1, delete this._offsetToWindow, delete this._offsetToParent, delete this._limits);
        } }, { key: "remove", value: function value() {
            var i = this;this._deactivate(), a.some(function (e, t) {
                if (e._node === i._node) return a.splice(t, 1), !0;
            }), this._removed = !0;
        } }]), v),
        g = { stickies: a, Sticky: m, forceSticky: function forceSticky() {
            f = !1, e(), this.refreshAll();
        }, addOne: function addOne(e) {
            if (!(e instanceof HTMLElement)) {
                if (!e.length || !e[0]) return;e = e[0];
            }for (var t = 0; t < a.length; t++) {
                if (a[t]._node === e) return a[t];
            }return new m(e);
        }, add: function add(i) {
            if ((i = i instanceof HTMLElement ? [i] : i).length) {
                for (var n = [], e = 0; e < i.length; e++) {
                    !function (e) {
                        var t = i[e];t instanceof HTMLElement ? a.some(function (e) {
                            if (e._node === t) return n.push(e), !0;
                        }) || n.push(new m(t)) : n.push(void 0);
                    }(e);
                }return n;
            }
        }, refreshAll: function refreshAll() {
            a.forEach(function (e) {
                return e.refresh();
            });
        }, removeOne: function removeOne(t) {
            if (!(t instanceof HTMLElement)) {
                if (!t.length || !t[0]) return;t = t[0];
            }a.some(function (e) {
                if (e._node === t) return e.remove(), !0;
            });
        }, remove: function remove(i) {
            if ((i = i instanceof HTMLElement ? [i] : i).length) for (var e = 0; e < i.length; e++) {
                !function (e) {
                    var t = i[e];a.some(function (e) {
                        if (e._node === t) return e.remove(), !0;
                    });
                }(e);
            }
        }, removeAll: function removeAll() {
            for (; a.length;) {
                a[0].remove();
            }
        } };function v(t) {
        if (function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, v), !(t instanceof HTMLElement)) throw new Error("First argument must be HTMLElement");if (a.some(function (e) {
            return e._node === t;
        })) throw new Error("Stickyfill is already applied to this node");this._node = t, this._stickyMode = null, this._active = !1, a.push(this), this.refresh();
    }f || e(), "undefined" != typeof module && module.exports ? module.exports = g : n && (l.Stickyfill = g);
}(window, document), function (o) {
    "use strict";
    var r = [];var e = window.location.hash || null;var n = o("[data-accordion]");var t = o(".accordion-filter");var i = o("button", t);t = o("[data-accordion-trigger]");var s = o("> ul > li[data-filter]", n),
        a = o("a", t);function l() {
        o(".accordion-filter").removeAttr("hidden");
    }e && o(e).length && (o("a[href='" + e + "']", t).addClass("active"), o(e).addClass("active"), l()), a.on("click", function (e) {
        var t = o(this);var i = t.attr("href");n.removeClass("active"), a.removeClass("active"), t.hasClass("active") || (t.addClass("active"), o(i).addClass("active"), l());
    }), i.each(function () {
        var t = o(this),
            i = t.data("filter-id");t.on("click", function (e) {
            t.hasClass("active") ? (t.removeClass("active"), r = r.filter(function (e) {
                return e !== i;
            })) : (t.addClass("active"), r.push(i)), console.log(r), r.length ? (s.attr("hidden", !0), s.each(function () {
                var t = o(this),
                    i = t.data("filter").split(",");for (var _e4 = 0; _e4 < i.length; _e4++) {
                    var n = i[_e4].trim().toLowerCase();if (n && -1 !== r.indexOf(n)) {
                        t.attr("hidden", !1);break;
                    }
                }
            })) : s.attr("hidden", !1);
        });
    });
}(jQuery), function (c) {
    function u(e) {
        return parseFloat(e) || 0;
    }function d(e) {
        var t = { byRow: !0, property: "height", target: null, remove: !1, mq: null };return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? c.extend(t, e) : ("boolean" == typeof e ? t.byRow = e : "remove" === e && (t.remove = !0), t);
    }var n = -1,
        o = -1,
        h = c.fn.matchHeight = function (e) {
        e = d(e);if (e.remove) {
            var i = this;return this.css(e.property, ""), c.each(h._groups, function (e, t) {
                t.elements = t.elements.not(i);
            }), this;
        }return this.length <= 1 && !e.target ? this : (h._groups.push({ elements: this, options: e }), e.mq && window.matchMedia("only all").matches && !window.matchMedia(e.mq).matches || h._apply(this, e), this);
    };h._groups = [], h._throttle = 80, h._maintainScroll = !1, h._beforeUpdate = null, h._afterUpdate = null, h._apply = function (e, t) {
        var n,
            o,
            r = d(t),
            i = c(e),
            s = [i],
            a = c(window).scrollTop(),
            l = c("html").outerHeight(!0),
            t = i.parents().filter(":hidden");return t.each(function () {
            var e = c(this);e.data("style-cache", e.attr("style"));
        }), t.css("display", "block"), r.byRow && !r.target && (i.each(function () {
            var e = c(this),
                t = "inline-block" === e.css("display") ? "inline-block" : "block";e.data("style-cache", e.attr("style")), e.css({ display: t, "padding-top": "0", "padding-bottom": "0", "margin-top": "0", "margin-bottom": "0", "border-top-width": "0", "border-bottom-width": "0", height: "100px" });
        }), e = c(e = i), n = null, o = [], e.each(function () {
            var e = c(this),
                t = e.offset().top - u(e.css("margin-top")),
                i = 0 < o.length ? o[o.length - 1] : null;null !== i && Math.floor(Math.abs(n - t)) <= 1 ? o[o.length - 1] = i.add(e) : o.push(e), n = t;
        }), s = o, i.each(function () {
            var e = c(this);e.attr("style", e.data("style-cache") || "");
        })), c.each(s, function (e, t) {
            var t = c(t),
                i = 0;if (r.target) i = r.target.outerHeight(!1);else {
                if (r.byRow && t.length <= 1) return void t.css(r.property, "");t.each(function () {
                    var e = c(this),
                        t = { display: "inline-block" === e.css("display") ? "inline-block" : "block" };t[r.property] = "", e.css(t), e.outerHeight(!1) > i && (i = e.outerHeight(!1)), e.css("display", "");
                });
            }t.each(function () {
                var e = c(this),
                    t = 0;r.target && e.is(r.target) || ("border-box" !== e.css("box-sizing") && (t += u(e.css("border-top-width")) + u(e.css("border-bottom-width")), t += u(e.css("padding-top")) + u(e.css("padding-bottom"))), e.css(r.property, i - t));
            });
        }), t.each(function () {
            var e = c(this);e.attr("style", e.data("style-cache") || null);
        }), h._maintainScroll && c(window).scrollTop(a / l * c("html").outerHeight(!0)), this;
    }, h._applyDataApi = function () {
        var i = {};c("[data-match-height], [data-mh]").each(function () {
            var e = c(this),
                t = e.attr("data-mh") || e.attr("data-match-height");t in i ? i[t] = i[t].add(e) : i[t] = e;
        }), c.each(i, function () {
            this.matchHeight(!0);
        });
    };function r(e) {
        h._beforeUpdate && h._beforeUpdate(e, h._groups), c.each(h._groups, function () {
            return this.options.mq && window.matchMedia("only all").matches && !window.matchMedia(this.options.mq).matches ? (this.elements.css(this.options.property, ""), !0) : void h._apply(this.elements, this.options);
        }), h._afterUpdate && h._afterUpdate(e, h._groups);
    }h._update = function (e, t) {
        if (t && "resize" === t.type) {
            var i = c(window).width();if (i === n) return;n = i;
        }e ? -1 === o && (o = setTimeout(function () {
            r(t), o = -1;
        }, h._throttle)) : r(t);
    }, c(h._applyDataApi), c(window).bind("load", function (e) {
        h._update(!1, e);
    }), c(window).bind("resize orientationchange", function (e) {
        h._update(!0, e);
    });
}(jQuery), function () {
    "use strict";
    var e,
        t = document.querySelector(".lv-page"),
        i = null;function n() {
        i.offset = 140, 768 <= window.innerWidth && (i.offset = 230), 992 <= window.innerWidth && (i.offset = 230);
    }window.addEventListener("load", function () {
        var _ref3;

        i || (i = new Headroom(t, (_ref3 = { offset: 0, tolerance: 0 }, _defineProperty(_ref3, "tolerance", { up: 5, down: 0 }), _defineProperty(_ref3, "classes", { initial: "headroom", pinned: "headroom--pinned", unpinned: "headroom--unpinned", top: "headroom--top", notTop: "headroom--not-top", bottom: "headroom--bottom", notBottom: "headroom--not-bottom" }), _defineProperty(_ref3, "onPin", function onPin() {}), _defineProperty(_ref3, "onUnpin", function onUnpin() {}), _defineProperty(_ref3, "onTop", function onTop() {}), _defineProperty(_ref3, "onNotTop", function onNotTop() {}), _defineProperty(_ref3, "onBottom", function onBottom() {}), _defineProperty(_ref3, "onNotBottom", function onNotBottom() {}), _ref3)), n(), i.init());
    }), window.addEventListener("resize", function () {
        clearTimeout(e), e = setTimeout(function () {
            i && n();
        }, 250);
    });
}(), function (n) {
    "use strict";
    n("[data-slider]").each(function () {
        var e = n(this),
            t = n("[data-flickity]", e),
            i = n(".slider-prev-btn", e),
            e = n(".slider-next-btn", e);1 < t.children().length && (i.on("click", function () {
            t.flickity("previous").flickity("stopPlayer");
        }), e.on("click", function () {
            t.flickity("next").flickity("stopPlayer");
        }));
    });
}(jQuery), function () {
    "use strict";
    window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = Array.prototype.forEach);var e = document.querySelector(".lv-topbar"),
        n = e.querySelectorAll("ul:first-child > li"),
        t = window.location.pathname;var i = t.split("/").slice(1).slice(0, -1);if ("/" == t) e.querySelector("li:nth-child(2)").classList.add("active");else if ("/about/" == t) e.querySelector('li[data-alias="about"]').classList.add("active");else if ("/about-us/" == t) e.querySelector('li[data-alias="about-us"]').classList.add("active");else if ("/search/" == t) e.querySelector('li[data-alias="search"]').classList.add("active");else {
        var o = e.querySelector('a[href="' + t + '"]');if (o) {
            if (i.length <= 2) {
                var r = o.parentNode.parentNode.parentNode;r.classList.contains("lv-topbar") || r.classList.add("active");
            }if (i.length <= 3) {
                var s = o.parentNode.parentNode.parentNode.parentNode.parentNode;s.classList.add("active");
            }if (3 == i.length) {
                var a = o.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;a.classList.add("active"), o.parentNode.parentNode.parentNode.classList.add("active");
            }
        }
    }n.forEach(function (i) {
        var e = i.querySelector("a");e && e.addEventListener("click", function (e) {
            var _this9 = this;

            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : i;
            e.preventDefault();e = -1 < this.href.indexOf("#");e || (n.forEach(function (e) {
                e.classList.remove("active");
            }), t.classList.add("active")), t.classList.contains("has-dropdown") || e ? e || document.documentElement.classList.remove("has-closed-nav") : (document.documentElement.classList.add("has-closed-nav"), setTimeout(function () {
                window.location = _this9.href;
            }, 150));
        });
    });
}(), function (i) {
    "use strict";
    var n = i("html"),
        e = (i(".lv-page"), i(".lv-off-canvas")),
        t = i(".dropdown", e),
        o = i("li:not(.has-dropdown) > a", t),
        e = i(".submenu-arrow");i("[data-menu-toggle]").on("click", function (e) {
        e.preventDefault(), n.toggleClass("has-open-menu");
    }), e.on("click", function (e) {
        e.preventDefault(), e.stopPropagation(), i(this).parent().next(".dropdown").addClass("is-open");
    }), o.click(function (e) {
        e.preventDefault();var t = i(this).attr("href");n.removeClass("has-open-menu").addClass("has-closed-menu"), setTimeout(function () {
            window.location = t;
        }.bind(t), 200);
    }), t.on("click", function (e) {
        i(this).removeClass("is-open"), e.stopPropagation();
    });
}(jQuery), function () {
    "use strict";
    var t = document.querySelector("body > [data-global-search]"),
        e = t.querySelector("input");function i() {
        t.classList.remove("active"), document.activeElement.blur();
    }document.querySelectorAll('a[href="#/search/"]').forEach(function (e) {
        e.addEventListener("click", function (e) {
            e.preventDefault(), t.classList.add("active"), t.querySelector("input").focus();
        });
    }), t.addEventListener("mousedown", i), e.addEventListener("mousedown", function (e) {
        e.stopPropagation();
    }), document.addEventListener("keyup", function (e) {
        27 === e.keyCode && i();
    });
}(), document.getElementById("vue-jobs-listing-app") && init(), document.getElementById("vue-customer-profile-app") && init(), $("#modal-newsletter").on("shown.bs.modal", function () {
    $(this).find("form").validator("destroy").validator();
});var elements = $(".is-sticky");Stickyfill.add(elements), $("[data-equal-height]").matchHeight({ byRow: !1, property: "height", target: null, remove: !1, mq: "(min-width: 768px)" }), $("#aus-map").imageMapResize(), $("[data-sitemap-trigger]").on("click", function (e) {
    $(".fa", $(this)).toggleClass("fa-angle-down"), $("[data-sitemap]").toggleClass("is-collapsed");
}), $('a[href*="#"]:not([href="#"], [data-toggle="tab"])').on("click", function () {
    var e = $(this).attr("href"),
        t = $(e),
        e = $(".global-header").height();return t.length && $(this).parent().parent().parent().hasClass("accordion-trigger") ? ($.scrollTo(t.offset().top - 220, 800), !1) : t.length ? ($.scrollTo(t.offset().top - e, 800), !1) : void 0;
}), $("[data-back-top]").click(function () {
    $.scrollTo(0, 500);
});var currFFZoom = 1,
    currIEZoom = 100,
    isFirefox = -1 < navigator.userAgent.toLowerCase().indexOf("firefox"),
    isIE11 = 11 === ieVersion() || !1;function ieVersion(e) {
    e = e || navigator.userAgent;e = /\b(MSIE |Trident.*?rv:|Edge\/)(\d+)/.exec(e);if (e) return parseInt(e[2]);
}$("[data-resize-up]").on("click", function () {
    isFirefox || isIE11 ? (currFFZoom += .02, $("body").css("transform", "scale(" + currFFZoom + ")"), $("body").css("transform-origin", "top center")) : (currIEZoom += 2, $("body").css("zoom", " " + currIEZoom + "%"));
}), $("[data-resize-down]").on("click", function () {
    isFirefox || isIE11 ? (currFFZoom -= .02, $("body").css("transform", "scale(" + currFFZoom + ")")) : (currIEZoom -= 2, $("body").css("zoom", " " + currIEZoom + "%"));
}), $(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
