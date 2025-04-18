import { menuModel } from "../models.js";

export const CreateMenu = async (req, res, next) => {
    try {
        const { name, parentId = null, children = [] } = req.body;
        const newMenu = new menuModel({
            name,
            parentId,
            children,
        });
        const menuSaved = await newMenu.save();
        res.json(menuSaved);
    } catch (error) {
        res.json({ error: err.message });
    }
};

export const GetAllMenus = async (req, res, next) => {
    try {
        const menus = await menuModel
            .find()
            .populate("children")
            .populate("parentId");
        res.status(200).json(menus);
    } catch (err) {
        resjson({ error: err.message });
    }
};

export const UpdateMenuChildren = async (req, res, next) => {
    try {
        const { menuId } = req.query;
        const { children = [] } = req.body;

        const parentMenu = await menuModel.findById(menuId);
        if (!parentMenu) {
            return res.status(404).json({ error: "Menu not found" });
        }

        // 1. Remove parentId from all previous children
        await menuModel.updateMany(
            { parentId: parentMenu._id },
            { $set: { parentId: null } }
        );

        // 2. Clear current children from others’ children arrays
        await menuModel.updateMany(
            { children: parentMenu._id },
            { $pull: { children: parentMenu._id } }
        );

        // 3. Update new children’s parentId to parentMenu._id
        await menuModel.updateMany(
            { _id: { $in: children } },
            { $set: { parentId: parentMenu._id } }
        );

        // 4. Update parentMenu's children array
        parentMenu.children = children;
        await parentMenu.save();

        res.status(200).json({
            message: "Parent and children updated successfully.",
            parentMenu,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
