'use client'

import React, { useState } from 'react'
import { Order } from '../AdminOrdersContent'
import { useTranslations } from 'next-intl';
import UnderlinedText from '@/components/SearchPageComponents/SearchPageContent/UnderlinedText';
import OrderInfo from './OrderInfo';
import { AnimatePresence, motion } from 'framer-motion';

interface OrderCardProps {
    order : Order;
    fetchTravels: () => Promise<void>;
}

const OrderCard:React.FC<OrderCardProps> = ({ order, fetchTravels }) => {

    const t = useTranslations("AdminOrders")

    const [isOpen, setIsOpen] = useState(false)
    const [hover, setHover] = useState(false)

  return (
    <div className='px-[4rem] py-[2rem] bg-light-white border border-gray/25 shadow-custom rounded-[1rem]'>
        <div className='grid xl:grid-cols-[1.5fr,3fr] max-xl:gap-[2rem]' onClick={() => setIsOpen(prev => !prev)}>
            <div className='flex xl:justify-between gap-[2rem] justify-center'>
                <div className='flex flex-col items-center font-open-sans gap-[0.25rem] relative' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <p className='font-bold xl:text-[1rem] text-[1.333rem] text-dark-gray cursor-help'>{ order.public_id}</p>
                    <p className='font-[400] xl:text-[1rem] text-[1.333rem] text-gray/75'>{ t("id") }</p>
                </div>
                <div className='flex flex-col items-center font-open-sans mr-[1.5rem] gap-[0.25rem]'>
                    <p className='font-bold xl:text-[1rem] text-[1.333rem] text-dark-gray cursor-help'>{ order.passengers[0].lastname } { order.passengers[0].firstname }</p>
                    <p className='font-[400] xl:text-[1rem] text-[1.333rem] text-gray/75'>{ t("main-pass") }</p>
                </div>
            </div>

            <div className='flex xl:justify-between justify-center gap-[2rem] lg:flex-row flex-col'>
                <div className='flex flex-col items-center font-open-sans gap-[0.25rem]'>
                    <div className='flex items-center gap-[0.25rem]'>
                        <img src="/icons/route-card-icons/icon-passenger.svg" alt="passenger" className='xl:size-[1rem] size-[1.333rem]' />
                        <p className='font-bold xl:text-[1rem] text-[1.333rem] text-dark-gray cursor-help'>{ order.passengers.length }</p>
                    </div>
                    <p className='font-[400] xl:text-[1rem] text-[1.333rem] text-gray/75'>{ t("pass-nr") }</p>
                </div>
                <div className='flex flex-col items-center font-open-sans gap-[0.25rem]'>
                    <p className='font-bold xl:text-[1rem] text-[1.333rem] text-dark-gray cursor-help'>{ order.contact_details.phone_number }</p>
                    <p className='font-[400] xl:text-[1rem] text-[1.333rem] text-gray/75'>{ t("phone") }</p>
                </div>
                <div className='flex flex-col items-center font-open-sans gap-[0.25rem]'>
                    <p className='font-bold xl:text-[1rem] text-[1.333rem] text-dark-gray cursor-help'>{ order.passengers.reduce((acc, person) => acc + person.price.value, 0)}{ order.passengers[0].price.currency }</p>
                    <p className='font-[400] xl:text-[1rem] text-[1.333rem] text-gray/75'>{ t("total-price") }</p>
                </div>
                <div className='flex items-center font-open-sans gap-[0.25rem] justify-center max-xl:hidden'>
                    <img src="/icons/route-card-icons/icon-info.svg" alt="info" draggable={false} className='lg:size-[1rem] size-[1.333rem]' />
                    <UnderlinedText text={ t('about') }/>
                </div>
            </div>

            <div className='flex items-center font-open-sans gap-[0.25rem] justify-center xl:hidden'>
                <img src="/icons/route-card-icons/icon-info.svg" alt="info" draggable={false} className='lg:size-[1rem] size-[1.333rem]' />
                <UnderlinedText text={ t('about') }/>
            </div>
        </div>

        <AnimatePresence>
            {
                isOpen && <OrderInfo fetchTravels={fetchTravels} order={order}/>
            }
        </AnimatePresence>
    </div>
  )
}

export default OrderCard