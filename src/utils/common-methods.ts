import { Message } from "view-design";

export const createRandomStr = function(length = 8) {
    var aryNum = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
    ];
    let str = "";
    let len = aryNum.length;

    for (let i = 0; i < length; i++) {
        let random = Math.floor(Math.random() * len);
        str += aryNum[random];
    }
    return str;
};

export function deepCopy(target: any, map = new WeakMap()) {
    const mapTag = "[object Map]";
    const setTag = "[object Set]";
    const arrayTag = "[object Array]";
    const objectTag = "[object Object]";
    const argsTag = "[object Arguments]";

    const boolTag = "[object Boolean]";
    const dateTag = "[object Date]";
    const numberTag = "[object Number]";
    const stringTag = "[object String]";
    const symbolTag = "[object Symbol]";
    const errorTag = "[object Error]";
    const regexpTag = "[object RegExp]";
    const funcTag = "[object Function]";

    const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

    function forEach(array: Array<any>, iteratee: any) {
        let index = -1;
        const length = array.length;
        while (++index < length) {
            iteratee(array[index], index);
        }
        return array;
    }

    function isObject(target: any) {
        const type = typeof target;
        return target !== null && (type === "object" || type === "function");
    }

    function getType(target: any) {
        return Object.prototype.toString.call(target);
    }

    function getInit(target: any) {
        const Ctor = target.constructor;
        return new Ctor();
    }

    function cloneSymbol(targe: any) {
        return Object(Symbol.prototype.valueOf.call(targe));
    }

    function cloneReg(targe: any) {
        const reFlags = /\w*$/;
        const result = new targe.constructor(targe.source, reFlags.exec(targe));
        result.lastIndex = targe.lastIndex;
        return result;
    }

    function cloneOtherType(targe: any, type: any) {
        const Ctor = targe.constructor;
        switch (type) {
            case boolTag:
            case numberTag:
            case stringTag:
            case errorTag:
            case dateTag:
                return new Ctor(targe);
            case regexpTag:
                return cloneReg(targe);
            case symbolTag:
                return cloneSymbol(targe);
            default:
                return null;
        }
    }
    // 克隆原始类型
    if (!isObject(target)) {
        return target;
    }

    // 初始化
    const type = getType(target);
    let cloneTarget: any;
    if (deepTag.includes(type)) {
        cloneTarget = getInit(target);
    } else {
        return cloneOtherType(target, type);
    }

    // 防止循环引用
    if (map.get(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);

    // 克隆set
    if (type === setTag) {
        target.forEach((value: any) => {
            cloneTarget.add(deepCopy(value, map));
        });
        return cloneTarget;
    }

    // 克隆map
    if (type === mapTag) {
        target.forEach((value: any, key: string) => {
            cloneTarget.set(key, deepCopy(value, map));
        });
        return cloneTarget;
    }

    // 克隆对象和数组
    const keys = type === arrayTag ? undefined : Object.keys(target);
    forEach(keys || target, (value: any, key: string) => {
        if (keys) {
            key = value;
        }
        cloneTarget[key] = deepCopy(target[key], map);
    });

    return cloneTarget;
}

export const highLightKeyword = (str: string, keyword: string) => {
    if (!keyword.trim()) {
        return "";
    }
    let ret = "";
    try {
        const replaceStr = '<i class="text-red">' + keyword + "</i>";
        ret = str.replace(new RegExp(keyword, "g"), replaceStr);
    } catch (error) {
        console.error(error);
    }
    return ret;
};

export const toastError = (error: any) => {
    if (typeof error === "string") {
        (Message as any).error(error);
    } else if (typeof error === "object") {
        if (!!error.data && !!error.data.status) {
            (Message as any).error(
                `错误(${error.data.status}):${error.data.message}`
            );
        } else if (Object.keys(error).length === 0) {
            (Message as any).error(error + "");
        } else {
            (Message as any).error(JSON.stringify(error));
        }
    }
};

interface SearchOption {
    info: Array<{
        operator?: "AND" | "OR" | "NOT";
        type: "content" | "name" | "catalogName" | "area";
        keyword: string;
        isExact: boolean;
    }>;
    timeRange?: {
        start: string | Date | number | null;
        end: string | Date | number | null;
    };
}

/**
 * 将关键词带上是否精确搜索信息
 * 假如精确搜索, 就加个双引号
 * 否则不加
 */
const keywordWithExactInfo = (keyword: string, isExact: boolean): string => {
    if (isExact) {
        return `"${keyword}"`;
    }
    return keyword;
};

export const tansSearchOptionToString = (
    option: SearchOption
): any | boolean => {
    let ret = {
        info: "",
    };
    if (!option.info || !option.info.length) {
        (Message as any).error("请至少填写一条信息");
        return false;
    }
    ret.info = option.info.reduce((total, item, index) => {
        let info = `${item.type}:${keywordWithExactInfo(
            item.keyword,
            item.isExact
        )}`;
        if (index === 0) {
            return (total += info);
        } else {
            return (total += `${item.operator}${info}`);
        }
    }, "");
    if (!!option?.timeRange?.start && !!option?.timeRange?.end) {
        Object.assign(ret, {
            timeRange: `${option.timeRange.start}TO${option.timeRange.end}`,
        });
    }
    return ret;
};

const getInfoItemString = (str: string): string | undefined => {
    let itemReg = /.+?((AND)|(OR)|(NOT))/;
    let matchResult = str.match(itemReg);
    if (matchResult === null) {
        return undefined;
    }
    let infoItemString = matchResult[0].slice(0, -matchResult[1].length);
    return infoItemString;
};

const handleLastInfoItem = (str: string) => {
    let itemReg = /((AND)|(OR)|(NOT)).+/;
    let match = str.match(itemReg);
    if (match === null) {
        return undefined;
    }
    return match[0];
};

const getInfoItemOperator = (str: any) => {
    let itemReg = /((AND)|(OR)|(NOT)).+/;
    let match = str.match(itemReg);
    if (match === null) {
        return undefined;
    }
    return match[1];
};

const getInfoItemType = (str: string): string | undefined => {
    let typeReg = /\w+?:/;
    let type = str.match(typeReg);
    if (type === null) {
        return undefined;
    }
    return type[0].slice(0, -1);
};

const getInfoKeywordNExact = (
    str: string
): { keyword: string; isExact: boolean } => {
    let reg = /^".+"$/;
    let match = str.match(reg);
    if (match === null) {
        return {
            keyword: str,
            isExact: false,
        };
    }
    return {
        keyword: str.slice(1, -1),
        isExact: true,
    };
};

export const transSearchStrToObject = (
    info: string,
    timeRange: string
): any => {
    let infoList = [];
    let infoStr = info;

    let count = 0;

    // 处理条件列表
    while (!!infoStr && infoStr.length) {
        count++;
        if (count > 256) {
            infoStr = "";
            console.error("endless loop");
        }

        let infoItemString;
        let infoItem: any = {};

        let type;
        let keywordInfo;

        let length;
        try {
            infoItemString = getInfoItemString(infoStr);
            // 在这里
            // 特殊处理第一个和最后一个
            if (infoItemString === undefined) {
                infoItemString = handleLastInfoItem(infoStr);
            }
            if (infoItemString === undefined) {
                infoItemString = infoStr;
            }
            length = infoItemString.length;
            if (infoList.length === 0) {
                infoItem.operator = "AND";
            } else {
                infoItem.operator = getInfoItemOperator(infoItemString);
                infoItemString = infoItemString?.slice(
                    infoItem.operator.length
                );
            }
            if (!!infoItemString) {
                type = getInfoItemType(infoItemString);
            }
            if (!!type) {
                infoItem.type = type;
                infoItemString = infoItemString?.slice(type.length + 1);
            }
            if (infoItemString) {
                keywordInfo = getInfoKeywordNExact(infoItemString);
                Object.assign(infoItem, keywordInfo);
            }
            infoList.push(deepCopy(infoItem));
            infoStr = infoStr.slice(length);
        } catch (error) {
            console.error(error);
        }
    }

    // 处理时间范围
    let timeRangeObj;
    let timeReg = /(.+)TO(.+)/;
    let timeMatch;
    try {
        if (!!timeRange) {
            timeMatch = timeRange.match(timeReg);
        }
        if (!!timeMatch) {
            timeRangeObj = {
                start: timeMatch[1],
                end: timeMatch[2],
            };
        }
    } catch (error) {
        console.error(error);
    }

    let ret = {
        info: infoList,
    };
    if (!!timeRangeObj) {
        Object.assign(ret, {
            timeRange: timeRangeObj,
        });
    }
    return ret;
};
