import { Schema } from 'mongoose';

export const ProblemSchema = new Schema({
  title: String,
  image: String,
  message: String,
  latitude: Number,
  longitude: Number,
  done: Boolean,
  deviceId: String,
});

export interface Problem extends Document {
  readonly title: string;
  readonly image: string;
  readonly message: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly done: boolean;
  readonly deviceId: string;
}
