import React from 'react'
import Helmet from '../components/Helmet'
import Section, { SectionBody, SectionTitle } from '../components/Section'
import Map from '../components/Map'



const Contact = () => {
    const key = 'AIzaSyBlxWcoh9aLZUqAnn-NIVV-Em9FJBCobXw'
    return (
        <Helmet title="Liên hệ">
            <Section>
                <SectionTitle>Vị trí</SectionTitle>
                <SectionBody>
                    <Map
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </SectionBody>
            </Section>
            <Section>
                <SectionBody>
                    <h3>Thông tin hỗ trợ</h3>
                    <ul>
                        <br />
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</li>
                        <br />
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</li>
                        <br />
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</li>
                    </ul>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Contact
