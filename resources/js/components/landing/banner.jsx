import React from 'react';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
const BgElement = Element.BgElement;
import 'rc-banner-anim/assets/index.css';
import {Button, Typography} from "antd";
export default function Banner() {
    const imgArray = [
        'slider1.jpg',
        'slider2.jpg',
        'slider3.jpg',
        // 'slider4.jpg',
    ];
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
                                    backgroundPosition: 'center',
                                }}
                            />
                            <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                                Online <br/>
                                Stationery Shop
                            </TweenOne>
                            <TweenOne className="banner-user-text"
                                      animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
                            >
                                <Button size={'large'} type={"default"} shape={'round'}>Shop Now</Button>
                            </TweenOne>
                        </Element>
                    )
                })
            }
        </BannerAnim>
    )
}
