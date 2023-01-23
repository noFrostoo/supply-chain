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
                startMoney: lobby.settings.start_money[uClass] ? lobby.settings.start_money[uClass]: 0,
                resourcePrice: lobby.settings.resource_price[uClass] ? lobby.settings.resource_price[uClass]:0,
                startMagazine: lobby.settings.start_magazine[uClass] ? lobby.settings.start_magazine[uClass]:0,
                transportCost: lobby.settings.transport_cost[uClass]? lobby.settings.transport_cost[uClass]:0,
                magazineCost: lobby.settings.start_money[uClass] ? lobby.settings.start_money[uClass]: 0,
                fixOrderCost: lobby.settings.fix_order_cost[uClass] ? lobby.settings.fix_order_cost[uClass]: 0,
                backOrderCost: lobby.settings.back_order_cost[uClass] ? lobby.settings.back_order_cost[uClass]: 0,
                additionalCost: lobby.settings.additional_cost[uClass] ? lobby.settings.additional_cost[uClass]: 0,
                incomingQueue: lobby.settings.incoming_start_queue[uClass] ? lobby.settings.incoming_start_queue[uClass]: [1,1],
                requestedQueue: lobby.settings.requested_start_queue[uClass] ? lobby.settings.requested_start_queue[uClass]: [1,1],
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
            incoming_start_queue: {},
            requested_start_queue: {},
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
            settings.incoming_start_queue[uClass.class] = uClass.incomingQueue
            settings.requested_start_queue[uClass.class] = uClass.requestedQueue
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
    removeEmpty(obj) {
        return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
    },
    removeEmptyRecursive(obj) {
        return Object.fromEntries(
          Object.entries(obj)
            .filter(([_, v]) => v != null)
            .map(([k, v]) => [k, v === Object(v) ? this.removeEmpty(v) : v])
        );
    }
}