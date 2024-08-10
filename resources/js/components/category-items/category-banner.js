import React from 'react'
import Proptypes from 'prop-types'
import BannerAnim, { Element } from 'rc-banner-anim'
import TweenOne from 'rc-tween-one'
import 'rc-banner-anim/assets/index.css'
const BgElement = Element.BgElement
export default function CategoryBanner (props) {
  return (
        <React.Fragment>
            <BannerAnim prefixCls="category-banner-user">
                <Element
                    prefixCls="banner-user-elem"
                >
                    <BgElement
                        key="bg"
                        className="bg"
                        style={{
                          backgroundImage: 'url(/images/slider/slider-1.jpg)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          height: 300
                        }}
                    />
                    <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                        {props.heroText}
                    </TweenOne>
                    <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                        {props.children}
                    </TweenOne>
                </Element>
            </BannerAnim>
        </React.Fragment>
  )
}

CategoryBanner.propTypes = {
  heroText: Proptypes.string,
  itemName: Proptypes.string,
  children: Proptypes.node
}

CategoryBanner.defaultPropTypes = {
  heroText: 'Category',
  itemName: ''
}
