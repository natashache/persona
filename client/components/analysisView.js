// ========= rendering personality analysis results ============

import React, { Component } from 'react'
import Chart from './chart'
import { connect } from 'react-redux'

class AnalysisView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { isAuthenticated, analysisResult } = this.props
    if(analysisResult.data) {
      return (
        <div >
          <div className='analysis container'
               style = {{textAlign: 'center', paddingTop: '50px'}}>
              <h4 style = {{textAlign: 'center'}}>
                Your Overall Personality
              </h4>
              <Chart data = { analysisResult.data.personalityScores.persona }
                     title = { 'Your personality' }
                     index = { 0 }/>
          </div>
          <div className = 'subCategories' >
            { analysisResult.data.personalityScores.persona
              .map((subCategory, i) => {
                return (
                  <div className = 'col-md-12'>
                    <p className = 'lead' style = {{textAlign: 'center'}}>
                       { subCategory.name }
                    </p>
                    <Chart data = { subCategory.children }
                           title = { subCategory.name }
                           index = { i+1 }/>
                  </div>)
              }) }
          </div>
        </div>
      )
    } else {
      return (
        <div className='analysis'></div>
      )
    }
  }
}
function mapStateToProps(state) {
  const { analysis, auth } = state
  const { analysisResult,error } = analysis
  const { isAuthenticated } = auth
  return {
    analysisResult,
    error,
    isAuthenticated
  }
}

export default connect(mapStateToProps, null)(AnalysisView)
