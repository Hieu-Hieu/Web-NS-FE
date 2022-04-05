import React from 'react'
import Helmet from '../components/Helmet'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import banner from '../images/banner2.jpg'
const center_content = {
    margin: '0 0 0 50%',
    transform: 'translateX(-50%)'

}

const Intro = () => {
    return (
        <div>
            <Helmet title="Giới thiệu">
                <Section>
                    <SectionTitle>
                        Về Nông sản hữu cơ
                    </SectionTitle>
                    <SectionBody >
                        <div className="intro__txt" style={{ textAlign: 'center', fontSize: '16px' }}>
                            Tất cả sản phẩm đăng bán trên Nông sản hữu cơ đều phải thông qua quá trình kiểm duyệt khắt khe và phải cung cấp được đầy đủ giấy phép, chứng từ đúng theo quy định của pháp luật. Vì vậy, khi mua hàng tại Bách Hóa Nông Sản, Quý khách hoàn toàn yên tâm về chất lượng sản phẩm và tận hưởng trải nghiệm dịch vụ đảm bảo của chúng tôi.

                            Chúng tôi cam kết đem đến cho bạn sản phẩm chất lượng, giá ưu đãi, chương trình khuyến mãi hấp dẫn.
                            <br />
                            <br />
                            <img src={banner} alt="#" style={center_content} />
                            <br />
                            <br />
                            Chúng tôi thật sự tin tưởng vào sức mạnh khai triển của công nghệ và mong muốn góp phần làm cho xã hội trở nên tốt đẹp hơn bằng việc cung cấp những thực phẩm sạch, đảm bảo sức khỏe và dinh dưỡng đến toàn bộ gia đình ở Việt Nam.
                        </div>
                    </SectionBody>
                </Section>
            </Helmet>
        </div>
    )
}

export default Intro
