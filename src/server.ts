import { fastify} from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider} from "fastify-type-provider-zod";
import { fastifyCors } from "@fastify/cors";
import { env } from "./env.ts";
import { getRoomsRoute } from "./http/routes/getRooms.ts";
import { createRooms } from "./http/routes/createRooms.ts";
import { getRoomQuestion } from "./http/routes/getRoomQuestion.ts";
import { createQuestion } from "./http/routes/createQuestion.ts";
import { uploadAudio } from "./http/routes/uploadAudio.ts";
import {fastifyMultipart} from "@fastify/multipart"

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {origin: "https://localhost:5173"});

app.register(fastifyMultipart)

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(getRoomsRoute)
app.register(createRooms)
app.register(getRoomQuestion)
app.register(createQuestion)
app.register(uploadAudio)

app.listen({port: env.PORT}).then(() => {
    console.log("Server is runnig!!!");
});