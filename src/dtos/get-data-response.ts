export interface GetDataResponse {
    data: {
        connection: {
            glucoseMeasurement: {
                Value: number;
                isHigh: boolean;
                isLow: boolean;
            }
        }
    }
}
