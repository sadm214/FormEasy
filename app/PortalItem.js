import mongoose from 'mongoose';

const PortalItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: [
      'ADMISSION', 'PSC', 'BTECH', 'PASSPORT', 'TRANSPORT', 
      'SCHOLARSHIP', 'HEALTH_BANKING', 'TAX_GST', 'AGRICULTURE_HOUSING', 
      'CERTIFICATES', 'OUTSOURCING', 'OFFLINE_JOBS', 'LATEST_JOBS', 'ADMIT_CARD', 'RESULT'
    ] 
  },
  dept: { type: String, default: 'GOVT PORTAL' },
  releaseDate: { type: String, default: 'Recent' },
  downloadUrl: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

PortalItemSchema.index({ title: 1, category: 1 }, { unique: true });

export default mongoose.models.PortalItem || mongoose.model('PortalItem', PortalItemSchema);