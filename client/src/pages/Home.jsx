import React from 'react'
import Slider from '../components/Slider.jsx'
import ServicesBanner from '../components/ServicesBanner.jsx'
import FeaturesVideo from '../components/FeaturesVideo.jsx'
import Achievements from '../components/Achievements.jsx'
import Counters from '../components/Counters.jsx'
import ImproveProcess from '../components/ImproveProcess.jsx'
import RecycleHow from '../components/RecycleHow.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import ClientsStrip from '../components/ClientsStrip.jsx'

export default function Home(){
  return (
    <>
      <Slider/>
      <ServicesBanner/>
      <FeaturesVideo/>
      <Achievements/>
      <Counters/>
      <ImproveProcess/>
      <RecycleHow/>
      <CtaBanner/>
      <ClientsStrip/>
    </>
  )
}
