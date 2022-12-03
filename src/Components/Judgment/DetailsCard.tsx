import React, { FC } from 'react'
import Button from '../bootstrap/Button'
import classNames from 'classnames'

interface IDetatilsCard {
    detailsKey: String,
    detailsValue: Number
}

const DetailsCard: FC<IDetatilsCard> = ({ detailsKey, detailsValue }) => {
  return (
        <div
            key={detailsKey as string}
            className='col d-flex flex-column align-items-center'>
            <Button
                color='dark'
                className='w-100 text-capitalize'
                rounded={1}
                isLight={false}>
                <div className='h6 mb-3 text-muted opacity-80'>
                    { detailsKey }
                </div>
                <div
                    className={classNames('h2', {
                        'text-light': true,
                    })}>
                    { detailsValue?.valueOf() }
                </div>
            </Button>
        </div>
  )
}

export default DetailsCard