import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import FamilyInformationMaintenance from '../views/familyInformationManagement/FamilyInformationMaintenance'
import FamilyInformationQuery from '../views/familyInformationManagement/FamilyInformationQuery'
import FamilyInformationReview from '../views/familyInformationManagement/FamilyInformationReview'
import FamilyMemberMaintenance from '../views/familyInformationManagement/FamilyMemberMaintenance'
import FamilyMemberQuery from '../views/familyInformationManagement/FamilyMemberQuery'
import FamilyMemberReview from '../views/familyInformationManagement/FamilyMemberReview'
import HouseholdAccountExpenditure from '../views/householdBillManagement/HouseholdAccountExpenditure'
import HouseholdAccountIncome from '../views/householdBillManagement/HouseholdAccountIncome'
import HouseholdAccountQuery from '../views/householdBillManagement/HouseholdAccountQuery'
import ManualReimbursementMaintenance from '../views/manualReimbursementManagement/ManualReimbursementMaintenance'
import ManualReimbursementApproval from '../views/manualReimbursementManagement/ManualReimbursementApproval'
import ManualReimbursementQuery from '../views/manualReimbursementManagement/ManualReimbursementQuery'
import ComprehensiveQuery from '../views/comprehensiveQuery/ComprehensiveQuery'
import Hello from '../views/Hello'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
  path: '/',
  redirect: '/login'
}, {
  path: '/login',
  name: 'Login',
  component: Login
}, {
  path: '/home',
  name: 'Home',
  component: Home,
  redirect: '/home/Hello',
  children: [{
    path: '/home/Hello',
    component: Hello
  }, {
    path: '/home/familyInformationManagement/FamilyInformationMaintenance',
    component: FamilyInformationMaintenance
  }, {
    path: '/home/familyInformationManagement/FamilyInformationQuery',
    component: FamilyInformationQuery
  }, {
    path: '/home/familyInformationManagement/FamilyInformationReview',
    component: FamilyInformationReview
  }, {
    path: '/home/familyInformationManagement/FamilyMemberMaintenance',
    component: FamilyMemberMaintenance
  }, {
    path: '/home/familyInformationManagement/FamilyMemberQuery',
    component: FamilyMemberQuery
  }, {
    path: '/home/familyInformationManagement/FamilyMemberReview',
    component: FamilyMemberReview
  }, {
    path: '/home/householdBillManagement/HouseholdAccountExpenditure',
    component: HouseholdAccountExpenditure
  }, {
    path: '/home/householdBillManagement/HouseholdAccountIncome',
    component: HouseholdAccountIncome
  }, {
    path: '/home/householdBillManagement/HouseholdAccountQuery',
    component: HouseholdAccountQuery
  }, {
    path: '/home/manualReimbursementManagement/ManualReimbursementMaintenance',
    component: ManualReimbursementMaintenance
  }, {
    path: '/home/manualReimbursementManagement/ManualReimbursementApproval',
    component: ManualReimbursementApproval
  }, {
    path: '/home/manualReimbursementManagement/ManualReimbursementQuery',
    component: ManualReimbursementQuery
  }, {
    path: '/home/ComprehensiveQuery/ComprehensiveQuery',
    component: ComprehensiveQuery
  }]
}]

const router = new VueRouter({
  routes
})

export default router
