// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'

import VaccinationByGender from '../VaccinationByGender'

import VaccinationByAge from '../VaccinationByAge'

import './index.css'

class CowinDashboard extends Component {
  state = {vaccinationData: {}, apiStatus: ''}

  componentDidMount() {
    this.getCowinData()
  }

  getCowinData = async () => {
    this.setState({apiStatus: 'loading'})

    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
          eachItem => ({
            vaccineDate: eachItem.vaccine_date,
            dose1: eachItem.dose_1,
            dose2: eachItem.dose_2,
          }),
        ),
        vaccinationByAge: fetchedData.vaccination_by_age.map(eachItem => ({
          age: eachItem.age,
          count: eachItem.count,
        })),
        vaccinationByGender: fetchedData.vaccination_by_gender.map(
          eachItem => ({
            countG: eachItem.count,
            gender: eachItem.gender,
          }),
        ),
      }

      this.setState({vaccinationData: updatedData, apiStatus: 'success'})
      console.log(updatedData.vaccinationByGender)
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  renderFailureView = () => (
    <div className="failure_container">
      <img
        className="failure_image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="loading-view" data-testid="loader">
      <Loader color="#ffffff" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {vaccinationData} = this.state

    return (
      <>
        <div className="cowin_card">
          <h1 className="cowin_card_heading">Vaccination Coverage</h1>
          <VaccinationCoverage
            vaccinationCoverage={vaccinationData.last7DaysVaccination}
          />
        </div>
        <div className="cowin_card">
          <h1 className="cowin_card_heading">Vaccination by gender</h1>
          <VaccinationByGender
            vaccinationByGender={vaccinationData.vaccinationByGender}
          />
        </div>
        <div className="cowin_card">
          <h1 className="cowin_card_heading">Vaccination by age</h1>
          <VaccinationByAge
            vaccinationByAge={vaccinationData.vaccinationByAge}
          />
        </div>
      </>
    )
  }

  renderViewBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'success':
        return this.renderSuccessView()
      case 'failure':
        return this.renderFailureView()
      default:
        return this.renderLoadingView()
    }
  }

  render() {
    return (
      <div className="container">
        <div className="website_container">
          <img
            className="website_logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1 className="web_heading">Co-WIN</h1>
        </div>
        <p className="web_description">CoWIN Vaccination in India</p>
        {this.renderViewBasedOnApiStatus()}
      </div>
    )
  }
}

export default CowinDashboard
