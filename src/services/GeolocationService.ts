import { Model } from 'mongoose';
import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GeolocationDocument } from 'src/schemas/Geolocation';
import { ConfigService } from '@nestjs/config';
import { AxiosFactory } from '../providers/AxiosFactory';
import { AxiosInstance } from 'axios';
import { DeleteResult } from 'mongodb';
import { IndexGeolocationDto } from 'src/dto/geolocation/IndexGeolocationDto';
import { IIndexGeolocations } from 'src/interfaces/geolocations/IIndexGeolocations';

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

            throw new HttpException('Geolocation service error', HttpStatus.FAILED_DEPENDENCY);
        }

        return this.geolocationModel.create(data);
    }

    async getAll({ skip, limit, sort, order, searchTerm }: IndexGeolocationDto): Promise<IIndexGeolocations> {
        const geolocations = await this.geolocationModel
            .find({
                $or: [
                    { ip: { $regex: searchTerm } },
                    { continent_name: { $regex: searchTerm } },
                    { country_name: { $regex: searchTerm } },
                    { city: { $regex: searchTerm } }
                ]
            })
            .skip(skip)
            .limit(limit)
            .sort([[order, sort]])
            .exec();

        const totalGeolocationsCount = await this.geolocationModel
            .find({
                $or: [
                    { ip: { $regex: searchTerm } },
                    { continent_name: { $regex: searchTerm } },
                    { country_name: { $regex: searchTerm } },
                    { city: { $regex: searchTerm } }
                ]
            })
            .countDocuments();

        return {
            geolocations,
            totalGeolocationsCount
        };
    }

    getAllByIp({ ip, skip, limit, sort, order }: IndexGeolocationDto): Promise<GeolocationDocument[]> {
        return this.geolocationModel
            .find({ ip })
            .skip(skip)
            .limit(limit)
            .sort([[order, sort]])
            .exec();
    }

    async delete(id: string): Promise<DeleteResult> {
        const geolocationToDelete = await this.geolocationModel.findById(id);

        if (!geolocationToDelete) {
            throw new NotFoundException('Resource does not exist');
        }

        return this.geolocationModel.deleteOne({ _id: id }).exec();
    }
}
