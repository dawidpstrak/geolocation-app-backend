import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GeolocationDocument = Geolocation & Document;

@Schema({ timestamps: true, strict: false })
export class Geolocation {}

export const GeolocationSchema = SchemaFactory.createForClass(Geolocation);
