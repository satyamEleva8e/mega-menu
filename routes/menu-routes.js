import express from "express";
import { CreateMenu, GetAllMenus, UpdateMenuChildren } from "../controller";

const router = express.Router();

router.post("/", CreateMenu);
router.get("/", GetAllMenus);
router.put("/", UpdateMenuChildren);
