export const utils = {
    parseClasses(lobby) {
        console.log("parse log", lobby)
        let nextId = 1;
        let maxClassNum = 0;
        let classes = [];
        console.log(lobby.settings.user_classes)
        for (let uClass of lobby.settings.user_classes) {
            console.log(uClass)
            let c = {
                id: nextId,
                class: uClass,
                startMoney: lobby.settings.start_money[uClass],
                resourcePrice: lobby.settings.resource_price[uClass],
                startMagazine: lobby.settings.start_magazine[uClass],
                transportCost: lobby.settings.transport_cost[uClass],
                magazineCost: lobby.settings.start_money[uClass],
                fixOrderCost: lobby.settings.fix_order_cost[uClass],
                backOrderCost: lobby.settings.back_order_cost[uClass],
                additionalCost: lobby.settings.additional_cost[uClass],
                startQueue: lobby.settings.start_order_queue[uClass],
            }
            console.log(c)
            classes.push(c)
            nextId += 1
            if (uClass > maxClassNum) maxClassNum=uClass;
        }
        console.log("parsed classes", classes)
        return {classes, nextId, maxClassNum}
    },
    toTemplateApi(template, classes) {
        console.log("parsing tempalte", template, classes)
        let settings = {
            demand_style: template.settings.demand_style,
            supply_style: template.settings.supply_style,
            max_rounds: template.settings.max_rounds,
            show_stats_for_users: template.settings.show_stats_for_users,
            unlimited_money: template.settings.unlimited_money,
            resource_basic_price: template.settings.resource_basic_price,
            user_classes: [],
            start_order_queue: {},
            resource_price: {},
            start_money: {},
            start_magazine: {},
            transport_cost: {},
            magazine_cost: {},
            fix_order_cost: {},
            back_order_cost: {},
            additional_cost: {},
          };
    
          for (let uClass of classes) {
            console.log(uClass)
            console.log(uClass.startQueue)
            settings.user_classes.push(uClass.class);
            settings.start_order_queue[uClass.class] = uClass.startQueue
            settings.resource_price[uClass.class] = uClass.resourcePrice
            settings.start_money[uClass.class] = uClass.startMoney
            settings.start_magazine[uClass.class] = uClass.startMagazine
            settings.transport_cost[uClass.class] = uClass.transportCost
            settings.magazine_cost[uClass.class] = uClass.magazineCost
            settings.fix_order_cost[uClass.class] = uClass.fixOrderCost
            settings.back_order_cost[uClass.class] = uClass.backOrderCost
            settings.additional_cost[uClass.class] = uClass.additionalCost
          } 
    
          
          template.settings = settings;
          console.log("template parsed: ", template)
          return template
    },
}