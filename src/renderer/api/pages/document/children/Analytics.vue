<template>
  <div>
    <div class="container">
      <h1>Totales</h1>
      <mau-spinner
              v-show="isTableLoading"
              :small="true"
      >

      </mau-spinner>
      <div v-show="!isTableLoading">
        <table class="w-100 mau-fade-component" :class="{'is-loaded': !isTableLoading}">
          <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Mis documentos</td>
            <td>{{apiResult.documents.total}}</td>
          </tr>
          <tr>
            <td>Mis documentos esta semana</td>
            <td>{{apiResult.documents.currentWeek}}</td>
          </tr>
          <tr>
            <td>Mis documentos este mes</td>
            <td>{{apiResult.documents.currentMonth}}</td>
          </tr>
          <tr>
            <td>Mis documentos este año</td>
            <td>{{apiResult.documents.currentYear}}</td>
          </tr>
          <tr>
            <td>Mis documentos este quarto</td>
            <td>{{apiResult.documents.currentQuarter}}</td>
          </tr>
          <tr>
            <td>Mis documentos estos ultimos 15 dias</td>
            <td>{{apiResult.documents.last15Days}}</td>
          </tr>
          <tr>
            <td>Mis documentos que son properiedad</td>
            <td>{{apiResult.documents.document_type.propertyTotal}}</td>
          </tr>
          <tr>
            <td>Mis documentos que son comercio</td>
            <td>{{apiResult.documents.document_type.commerceTotal}}</td>
          </tr>
          <tr>
            <td>Mis documentos que son otros</td>
            <td>{{apiResult.documents.document_type.otherTotal}}</td>
          </tr>
          <tr>
            <td>Mis documentos pendientes</td>
            <td>{{apiResult.documents.user_group.documentsPending}}</td>
          </tr>
          <tr>
            <td>Mis documentos en proceso de entrega</td>
            <td>{{apiResult.documents.user_group.documentsPendingDelivery}}</td>
          </tr>
          <tr>
            <td>Mis documentos entregados</td>
            <td>{{apiResult.documents.user_group.documentsDelivered}}</td>
          </tr>
          <tr>
            <td>Mis documentos en el registro publico</td>
            <td>{{apiResult.documents.user_group.documentsPublicRegistry}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import DocumentList from '../components/DocumentList.vue'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import ApiFunctions from 'renderer/services/api/ApiOperations'
  export default {
    name: 'AnalyticsDocument',
    data () {
      return {
        apiResult: '',
        isTableLoading: false
      }
    },
    created () {
      ApiFunctions.get(ApiUrls.createBaseUrl('data/me')).then(result => {
        this.apiResult = result
      })
    },
    components: {
      DocumentList
    }
  }
</script>
