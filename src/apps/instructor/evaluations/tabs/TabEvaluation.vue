<template>
    <el-row :gutter="12" v-if="session.records.length > 0">
        <el-col :span="8">
            <SelectModule :data="modules" :records="session.records" @select-module="handleSelectModule" />
        </el-col>
        <el-col :span="16">
            <div v-if="selectedModule">
                <div v-if="showPage">
                    <UnitPage :readonly="isReadonly" :module="selectedModule" :record="selectedRecord" @refresh="handleModuleUpdated" />
                </div>
                <div v-else>
                    <UnitDescription :readonly="isReadonly" :module="selectedModule" :record="selectedRecord" @refresh="handleModuleUpdated" />
                </div>
            </div>
        </el-col>
    </el-row>
    <div v-else>
        <p>Evaluation has not yet started, please visit back soon.</p>
    </div>
</template>

<script>

import UnitDescription from '../cards/UnitDescription.vue'
import UnitPage from '../cards/UnitPage.vue'
import UnitStatus from '../cards/UnitStatus.vue'
import SelectModule from '../forms/SelectModule.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    props: [
        'modules',
        'session'
    ],
    data() {
        return {
            showPage: true
        }
    },
    components: {
        UnitPage,
        UnitDescription,
        UnitStatus,
        SelectModule
    },
    computed: {
        ...mapGetters({
            'selectedModule': 'instructor_app/records/module',
            'selectedRecord': 'instructor_app/records/record'
        }),
        isReadonly() {
            if (this.session && this.session.completed) return true;
            if (this.session && this.session.evaluation && this.session.evaluation.kind === 'global') return true;
            return false;
        }
    },
    methods: {
        ...mapActions({
            selectModule: 'instructor_app/records/selectModule'
        }),
        handleSelectModule({ module, record }) {
            this.selectModule({ module, record })
        },
        handleModuleUpdated({ module, record }) {
            this.$emit('updateModule', { module, record })
        }
    }
}
</script>

<style>

</style>
