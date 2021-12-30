import { Model } from 'mongoose';
import { BadRequestException, HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GeolocationDocument } from 'src/schemas/Geolocation';
import { ConfigService } from '@nestjs/config';
import { AxiosFactory } from '../providers/AxiosFactory';
import { AxiosInstance } from 'axios';
import { DeleteResult } from 'mongodb';
import { IndexGeolocationDto } from 'src/dto/geolocation/IndexGeolocationDto';

@Injectable()
export class GeolocationService {
    private ipStackAxiosInstance: AxiosInstance;

    constructor(
        @InjectModel('geolocations') private readonly geolocationModel: Model<GeolocationDocument>,
        private readonly configService: ConfigService,
        private readonly axiosFactory: AxiosFactory
    ) {
        const { baseURL, apiKey } = this.configService.get('ipStack');

        this.ipStackAxiosInstance = this.axiosFactory.create({ baseURL, params: { access_key: apiKey } });
    }

    async save(ip: string): Promise<GeolocationDocument> {
        const {
            data: { error: ipStackError },
            data
        } = await this.ipStackAxiosInstance.get(ip);

        if (ipStackError) {
            const ipStackBadIpErrorCode = 106;

            if (ipStackError?.code === ipStackBadIpErrorCode) {
                throw new BadRequestException(ipStackError?.info);
            }

            Logger.error(ipStackError);

            throw new HttpException('Geolocation service error', 424);
        }

        return this.geolocationModel.create(data);
    }

    getAll({ skip, limit }: IndexGeolocationDto): Promise<GeolocationDocument[]> {
        return this.geolocationModel.find().skip(skip).limit(limit).exec();
    }

    getAllByIp({ ip, skip, limit }: IndexGeolocationDto): Promise<GeolocationDocument[]> {
        return this.geolocationModel.find({ ip }).skip(skip).limit(limit).exec();
    }

    delete(id: string): Promise<DeleteResult> {
        return this.geolocationModel.deleteOne({ _id: id }).exec();
    }
}
