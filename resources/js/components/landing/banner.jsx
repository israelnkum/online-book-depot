import React from 'react'
import BannerAnim, { Element } from 'rc-banner-anim'
import TweenOne from 'rc-tween-one'
import 'rc-banner-anim/assets/index.css'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
const BgElement = Element.BgElement
export default function Banner () {
  const imgArray = [
    'slider1.jpg',
    'slider2.jpg',
    'slider3.jpg'
  ]
  return (
        <BannerAnim prefixCls="banner-user">
            {
                imgArray.map((img, index) => {
                  return (
                        <Element
                            prefixCls="banner-user-elem"
                            key={index}
                        >
                            <BgElement
                                key="bg"
                                className="bg"
                                style={{
                                  backgroundImage: `url(/storage/assets/slider/${img})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center'
                                }}
                            />
                            <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                                Online <br/>
                                Stationery Shop
                            </TweenOne>
                            <TweenOne className="banner-user-text" animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
                            >
                                <Link style={{ color: '#f56a00' }} to={'/landing/shop'}>
                                    <Button size={'large'} type={'default'} shape={'round'}>Shop Now</Button>
                                </Link>
                            </TweenOne>
                        </Element>
                  )
                })
            }
        </BannerAnim>
  )
}
