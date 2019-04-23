import userSchema from './user';
import journeySchema from './journey';
import { mergeSchemas } from 'graphql-tools';

const finalSchema = mergeSchemas({schemas: [userSchema, journeySchema]});
export default finalSchema;

