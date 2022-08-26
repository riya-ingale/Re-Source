import React from 'react';
import { AnalyticsDashboard, ActiveUsersChart } from "react-analytics-charts";


export default function InstituteAnalytics() {
  return (
    <>
    {/* <div className='contaier analytics-container'>
      <div className='row'>
          <div className='col-md-6'>
          <AnalyticsDashboard
            authOptions={{ clientId }}
            renderCharts={(gapi, viewId) => {
              return (
                <ActiveUsersChart
                  gapi={gapi}
                  viewId={viewId}
                  days={28}
                  activeUserDays={7}
                />
              );
            }}
          />
          </div> */}
          <div className='col-md-6'></div>
      {/* </div>
      
    </div> */}
    </>
  )
}
