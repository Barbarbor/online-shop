export enum PaymentStatusTypes {
    PAID = 'PAID',
    NOT_PAID = 'NOT_PAID',
    PENDING = 'PENDING',   
}

export interface IOrder {
    id: number,
    order_date: number,
    status: PaymentStatusTypes,
    UserId: 1,
    total: number,
}