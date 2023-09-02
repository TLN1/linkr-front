import React from 'react';
import {
    View,
    DefaultSectionT,
    SectionListProps,
    SectionList as NativeSectionList
} from "react-native";

export default function SectionListWrapper<ItemT = any, SectionT = DefaultSectionT>(props: SectionListProps<ItemT, SectionT>) {
    if (props.scrollEnabled === false) {
        return (
            <View style={props.style}>
                {!!props.ListHeaderComponent && !!props.sections && props.sections.length > 0 && props.ListHeaderComponent}
                {!!props.ListEmptyComponent && (!props.sections || props.sections.length === 0) && props.ListEmptyComponent}
                {!!props.sections && props.sections.map((item: any, index) =>
                    <View key={!!props.keyExtractor ? props.keyExtractor(item, index) : `${index}`}>
                        {!!props.renderSectionHeader && props.renderSectionHeader({ section: item })}
                        {!!props.SectionSeparatorComponent && !!props.sections && typeof props.SectionSeparatorComponent === 'function' && (props.SectionSeparatorComponent as any)()}
                        {item.data.map((subitem: any, subindex) =>
                            <View key={`${subindex}`}>
                                {!!props.renderItem && props.renderItem({
                                    item: subitem, section: item, index: subindex, separators: {
                                        highlight: () => null,
                                        unhighlight: () => null,
                                        updateProps: (select: 'leading' | 'trailing', newProps: any) => null
                                    }
                                })}
                                {!!props.ItemSeparatorComponent && !!item.data && subindex < item.data.length - 1 && typeof props.ItemSeparatorComponent === 'function' && (props.ItemSeparatorComponent as any)()}
                            </View>)}
                        {!!props.SectionSeparatorComponent && !!props.sections && typeof props.SectionSeparatorComponent === 'function' && (props.SectionSeparatorComponent as any)()}
                        {!!props.renderSectionFooter && props.renderSectionFooter({ section: item })}
                    </View>)}
                {!!props.ListFooterComponent && !!props.sections && props.sections.length > 0 && props.ListFooterComponent}
            </View>
        );
    }
    return <NativeSectionList {...props} />;
};
