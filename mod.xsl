<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/root" name="wurui.stock-detail">
        <!-- className 'J_OXMod' required  -->
        <div class="J_OXMod oxmod-stock-detail" ox-mod="stock-detail">
            <ul class="slider">

                <li>
                    <div class="J_mainInfo">
                        <h3 data-key="name">...</h3>
                        <table class="maintable" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <th>Close</th>
                                    <td data-key="lastPrice">...</td>
                                    <th>
                                        MarketCap
                                    </th>
                                    <td data-key="marketcap">
                                        ...
                                    </td>
                                </tr>
                                <tr>
                                    <th>Avg</th>
                                    <td data-key="avg">...</td>
                                    <th>
                                        Percent
                                    </th>
                                    <td data-key="avgPercent">
                                        ...
                                    </td>
                                </tr>
                                <tr>
                                    <th>Med</th>
                                    <td data-key="med">...</td>
                                    <th>
                                        Percent
                                    </th>
                                    <td data-key="medPercent">
                                        ...
                                    </td>
                                </tr>
                                <tr>
                                    <th>Frequent</th>
                                    <td data-key="frequent">...</td>
                                    <th>
                                        Probability
                                    </th>
                                    <td data-key="frequentPercent">
                                        ...
                                    </td>
                                </tr>
                                <tr>
                                    <th>Range</th>
                                    <td data-key="range">...</td>
                                    <th>
                                        Last Date
                                    </th>
                                    <td data-key="lastDate">
                                        ...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </li>
                <li>
                    <div class="J_historicalChart">
                        loading...
                    </div>
                </li>
                <li>
                    <div class="J_distributionChart">
                        loading...
                    </div>
                </li>

            </ul>
        </div>
    </xsl:template>

</xsl:stylesheet>
