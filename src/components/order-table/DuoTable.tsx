import React, { memo } from 'react';

import type { OrderBookData } from '~/types/interfaces/orderBookData';

import DesktopTable from '~/components/order-table/DesktopTable';
import MobileTable from '~/components/order-table/MobileTable';

/*
 DuoTable is a component that combines the DesktopTable and MobileTable components.
*/
function DuoTable({
    orderBookData,
    refetch,
    showDetails,
    showTicker,
    tableStyleProps,
    showRefresh,
}: {
    orderBookData: OrderBookData[];
    refetch: () => void;
    showDetails: boolean;
    showTicker?: boolean;
    tableStyleProps?: string;
    showRefresh?: boolean;
}) {
    return (
        <>
            <DesktopTable
                showDetails={showDetails}
                orderBookData={(orderBookData as OrderBookData[]) || []}
                refetch={refetch}
                showTicker={showTicker}
                showRefresh={showRefresh}
                tableStyleProps={tableStyleProps}
            />
            <MobileTable
                showDetails={showDetails}
                orderBookData={(orderBookData as OrderBookData[]) || []}
                refetch={refetch}
                tableStyleProps={tableStyleProps}
            />
        </>
    );
}

export default memo(DuoTable);
