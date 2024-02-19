import {
  LalamoveEventType,
  LalamoveMarket,
  LalamoveServiceType,
  LalamoveStatus
} from '../enums/Lalamove'

import { Coordinates } from '@lalamove/lalamove-js/dist/models/coordinates'
import { Recipient } from '@lalamove/lalamove-js/dist/models/recipient'
import { Sender } from '@lalamove/lalamove-js/dist/models/sender'

export interface ILalamoveCoordinates {
  lat: string
  lng: string
}

export interface ILalamoveStop {
  coordinates: ILalamoveCoordinates
  address: string
}

interface StopLocation {
  id?: string
  coordinates: Coordinates
  address: string
}

export interface ILalamoveCreateQuotation {
  pickup: StopLocation
  delivery: StopLocation
  serviceType: LalamoveServiceType
  scheduleAt: number
  specialRequests: string[]
  weight?: string
}

export interface ILalamoveMetadata {
  refNo: string
  postId: string
  opportunityId: string
  businessId: string
  courierId: string
}

export interface ILalamovePlaceOrder {
  sender: Sender
  recipient: Recipient
  metadata: ILalamoveMetadata
  pod: boolean
}

interface Location {
  name: string
  phone: string
  address: string
  lat: string
  lng: string
}
export interface ILalamoveCreateOrder {
  post: {
    postId: string
    opportunityId: string
    businessId: string
    courierId: string
    refNo: string
  }
  pickup: Location
  delivery: Location
  province: string
  scheduleAt: number
  weight?: number
  serviceType: LalamoveServiceType
  codAmount?: number
  remarks: string
  tipRemarks?: string | undefined
}

export type ILalamoveWebhookUpdate = {
  apiKey: string
  timestamp: number
  signature: string
  eventId: string
  eventVersion: string
} & (
  | {
      eventType: LalamoveEventType.ORDER_STATUS_CHANGED
      data: {
        order:
          | {
              orderId: string
              market: LalamoveMarket
              driverId: string
              shareLink: string
              status: Exclude<LalamoveStatus, LalamoveStatus.CANCELED>
              previousStatus: string
              createdAt: string
              scheduleAt: string
            }
          | {
              orderId: string
              market: LalamoveMarket
              driverId: string
              shareLink: string
              status: LalamoveStatus.CANCELED
              previousStatus: string
              createdAt: string
              scheduleAt: string
              cancelParty: 'USER' | 'LALAMOVE_CUSTOMER_SUPPORT'
              cancelReason: string
            }
        updatedAt: string
      }
    }
  | {
      eventType: LalamoveEventType.DRIVER_ASSIGNED
      data: {
        order: {
          orderId: string
        }
        driver: {
          driverId: string
          name: string
          phone: string
          plateNumber: string
          photo: string
        }
        location: {
          lat: number
          lng: number
        }
        updatedAt: string
      }
    }
  | {
      eventType: LalamoveEventType.ORDER_AMOUNT_CHANGED
      data: {
        order: {
          orderId: string
          market: LalamoveMarket
          status: LalamoveStatus.ASSIGNING_DRIVER
          price: {
            currency: string
            subtotal: string
            priorityFee: string
            totalPrice: string
          }
        }
        balance: {
          currency: string
          amount: string
        }
        updatedAt: string
      }
    }
  | {
      eventType: LalamoveEventType.WALLET_BALANCE_CHANGED
      data: {
        balance: {
          currency: string
          amount: string
        }
        updatedAt: string
      }
    }
  | {
      eventType: LalamoveEventType.ORDER_REPLACED
      data: {
        order: {
          orderId: string
        }
        prevOrderId: string
        updatedAt: string
      }
    }
)
