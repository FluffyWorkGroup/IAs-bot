import { Events } from "discord.js";
import chalk from "chalk";

export default {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction, client) {
    if (
      !interaction.isButton() &&
      !interaction.isStringSelectMenu() &&
      !interaction.isModalSubmit()
    )
      return;
    var id = interaction.customId;
    var arg;
    var arg2;
    if (interaction.customId.includes("_")) {
      id = interaction.customId.split("_")[0];
      arg = interaction.customId.split("_")[1];
      arg2 = interaction.customId.split("_")[2];
    }
    const interact = interaction.client.interactions.get(id);

    if (!interact) {
      console.error(
        `No interaction matching ${interaction.customId} was found.`
      );
      return;
    }

    try {
      await interact.execute(interaction, client, arg, arg2);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this interaction!",
        ephemeral: true,
      });
    }
  },
};
