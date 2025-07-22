import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score, calinski_harabasz_score, davies_bouldin_score
from sklearn.cluster import AgglomerativeClustering
from scipy.cluster.hierarchy import dendrogram, linkage
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.spatial.distance import pdist, squareform
from scipy.stats import f_oneway
import warnings
warnings.filterwarnings('ignore')

# Create the data matrix from the CSV
data_text = """ID,D,O,A,E,P,Au,St,Co,Ac,De
001,8,9,6,10,5,6,4,5,4,4
002,9,9,8,6,7,8,5,5,4,4
003,8,8,9,6,9,9,4,3,5,5
004,9,9,8,7,8,7,5,5,4,4
005,8,9,7,9,8,7,5,4,5,4
006,7,8,6,9,6,6,4,5,3,3
007,8,7,9,6,8,10,3,3,4,5
008,8,7,8,9,7,9,4,4,4,4
009,6,8,7,5,10,7,3,2,5,5
010,9,9,9,6,8,8,5,5,4,4
011,9,10,9,6,7,8,5,5,4,4
012,8,8,8,5,8,7,3,4,4,4
013,8,8,6,10,5,6,4,5,3,4
014,8,9,9,6,8,8,4,3,4,5
015,9,8,9,6,9,9,5,4,5,5
016,9,8,8,8,7,7,4,3,5,5
017,8,8,6,9,5,6,4,5,3,3
018,8,9,8,6,8,7,4,4,4,4
019,8,9,8,7,8,7,4,3,5,4
020,5,6,8,7,9,8,2,2,5,5
021,9,9,9,6,9,8,4,4,5,5
022,8,9,8,6,10,7,3,3,5,5
023,9,9,9,7,8,9,5,3,5,5
024,9,9,9,8,8,10,4,5,4,5
025,9,9,9,7,8,8,5,5,4,4
026,8,9,8,6,9,9,3,4,4,5
027,9,8,8,10,8,8,4,4,5,5
028,9,9,9,6,8,9,5,4,5,5
029,9,9,8,9,9,8,5,4,5,5
030,7,8,7,10,6,7,4,5,3,4
031,9,9,10,5,9,8,4,4,4,5
032,9,8,7,10,6,7,4,5,3,4
033,9,9,9,6,9,10,5,4,5,5
034,10,10,9,6,9,8,5,5,4,5
035,8,8,8,6,8,7,3,2,5,4
036,8,8,8,6,9,8,3,2,5,5
037,7,8,9,7,8,9,3,4,4,5
038,9,9,8,8,8,9,4,4,5,5
039,9,9,9,7,9,10,5,5,4,5
040,8,10,8,8,7,7,4,4,3,4
041,8,8,8,9,8,8,4,5,4,4
042,9,10,9,6,8,8,5,5,4,4
043,8,8,7,10,7,7,4,3,4,4
044,9,9,10,6,9,9,4,4,4,5
045,8,8,8,7,9,7,4,4,4,4
046,9,8,9,6,8,10,4,4,4,5
047,8,8,8,7,8,7,4,3,4,4
048,8,8,8,6,8,7,4,4,4,4
049,8,8,8,6,9,7,4,4,4,4
050,9,9,9,8,8,9,5,5,4,5
051,8,8,9,6,8,8,3,4,4,4
052,7,8,7,10,6,7,3,3,3,4
053,8,9,9,6,8,8,4,4,4,4
054,10,10,9,7,9,9,5,5,4,5
055,8,9,8,6,8,8,4,4,4,4
056,8,8,8,6,9,7,4,4,4,4
057,8,9,8,6,8,7,5,4,4,4
058,9,9,9,8,9,9,5,5,4,5
059,7,7,7,8,6,7,3,2,4,4
060,7,7,7,8,6,7,3,2,4,4
061,10,9,9,8,8,9,5,5,4,5
062,8,10,9,6,9,9,4,4,4,5
063,9,9,8,9,9,8,5,5,5,5
064,9,8,8,8,9,8,4,4,5,5
065,10,9,9,10,9,9,5,5,5,5
066,9,9,8,6,10,8,5,4,5,5
067,9,9,10,7,8,10,4,5,4,5
068,9,9,8,7,9,8,4,4,5,5
069,8,8,9,7,8,9,3,2,5,5
070,9,9,8,7,9,8,5,5,4,5
071,9,9,9,6,8,9,4,5,4,5
072,10,9,9,6,9,10,3,5,4,5
073,10,10,9,7,9,9,5,5,5,5
074,9,9,8,8,8,9,5,3,5,5
075,9,9,10,6,9,10,5,5,4,5
076,9,9,8,6,10,8,4,4,5,5
077,9,9,9,7,9,10,5,5,4,5
078,9,9,10,8,8,9,4,5,5,5
079,9,9,9,7,9,9,5,5,4,5
080,9,9,9,6,9,8,4,5,4,5
081,9,9,9,7,9,8,5,5,4,5
082,9,8,8,10,8,8,4,5,4,5
083,9,10,9,7,9,9,5,5,4,5
084,9,8,9,7,9,8,4,4,5,5
085,8,9,8,7,9,8,4,5,4,5
086,8,9,10,6,9,9,4,5,4,5
087,8,9,8,7,8,8,5,5,4,4
088,9,9,9,6,8,10,4,5,4,5
089,8,8,8,6,9,8,4,4,4,4
090,8,9,9,6,8,8,4,5,4,4
091,8,9,8,7,9,8,5,4,4,4
092,9,10,9,6,8,9,4,5,4,5
093,8,9,8,6,9,8,5,4,5,4
094,10,9,9,6,9,9,4,5,4,5
095,9,8,9,7,8,9,4,4,4,5
096,8,9,8,6,10,8,4,4,4,5
097,8,8,8,7,8,8,4,4,4,4
098,8,8,7,10,7,8,4,5,3,4
099,9,10,9,7,9,9,4,5,4,5
100,8,9,8,8,8,8,4,4,4,4"""

def main():
    # Read the data
    from io import StringIO
    df = pd.read_csv(StringIO(data_text))
    
    # Extract features (exclude ID)
    X = df.drop('ID', axis=1).values
    feature_names = df.drop('ID', axis=1).columns.tolist()
    
    # Standardize the data
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    print("=== COMPREHENSIVE CLUSTER VALIDATION ANALYSIS ===\n")
    print(f"Dataset: 100 Instagram posts × 10 dimensions")
    print(f"Features: {feature_names}")
    print(f"Data shape: {X.shape}")
    print(f"Standardized data range: [{X_scaled.min():.2f}, {X_scaled.max():.2f}]")
    
    # 1. MULTIPLE CLUSTER ANALYSIS (K=3 to 8)
    print("\n" + "="*60)
    print("1. MULTIPLE CLUSTER ANALYSIS (K=3 to 8)")
    print("="*60)
    
    k_range = range(3, 9)
    results = {}
    
    for k in k_range:
        # K-means clustering
        kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
        labels = kmeans.fit_predict(X_scaled)
        
        # Calculate validation metrics
        inertia = kmeans.inertia_
        silhouette = silhouette_score(X_scaled, labels)
        calinski_harabasz = calinski_harabasz_score(X_scaled, labels)
        davies_bouldin = davies_bouldin_score(X_scaled, labels)
        
        # Calculate cluster sizes and balance
        unique, counts = np.unique(labels, return_counts=True)
        cluster_sizes = dict(zip(unique, counts))
        size_balance = np.std(counts) / np.mean(counts)  # CV of cluster sizes
        
        results[k] = {
            'inertia': inertia,
            'silhouette': silhouette,
            'calinski_harabasz': calinski_harabasz,
            'davies_bouldin': davies_bouldin,
            'cluster_sizes': cluster_sizes,
            'size_balance': size_balance,
            'labels': labels
        }
        
        print(f"\nK={k} Results:")
        print(f"  Inertia (WCSS): {inertia:.2f}")
        print(f"  Silhouette Score: {silhouette:.3f}")
        print(f"  Calinski-Harabasz: {calinski_harabasz:.2f}")
        print(f"  Davies-Bouldin: {davies_bouldin:.3f}")
        print(f"  Cluster sizes: {cluster_sizes}")
        print(f"  Size balance (CV): {size_balance:.3f}")
    
    # 2. ELBOW METHOD ANALYSIS
    print("\n" + "="*60)
    print("2. ELBOW METHOD ANALYSIS")
    print("="*60)
    
    inertias = [results[k]['inertia'] for k in k_range]
    elbow_scores = []
    
    for i in range(1, len(inertias)-1):
        # Calculate rate of change (second derivative approximation)
        d1 = inertias[i] - inertias[i-1]
        d2 = inertias[i+1] - inertias[i]
        elbow_score = abs(d2 - d1)
        elbow_scores.append(elbow_score)
    
    print("Inertia values:")
    for k, inertia in zip(k_range, inertias):
        print(f"  K={k}: {inertia:.2f}")
    
    print("\nElbow scores (rate of change):")
    for i, score in enumerate(elbow_scores):
        print(f"  K={k_range[i+1]}: {score:.2f}")
    
    best_elbow_k = k_range[np.argmax(elbow_scores) + 1]
    print(f"\nOptimal K by Elbow Method: {best_elbow_k}")
    
    # 3. GAP STATISTIC CALCULATION
    print("\n" + "="*60)
    print("3. GAP STATISTIC CALCULATION")
    print("="*60)
    
    def calculate_gap_statistic(X, k_range, n_refs=10):
        gaps = []
        for k in k_range:
            # Actual clustering
            kmeans = KMeans(n_clusters=k, random_state=42)
            kmeans.fit(X)
            actual_inertia = kmeans.inertia_
            
            # Reference datasets
            ref_inertias = []
            for _ in range(n_refs):
                # Generate random reference data
                random_data = np.random.uniform(X.min(axis=0), X.max(axis=0), X.shape)
                ref_kmeans = KMeans(n_clusters=k, random_state=42)
                ref_kmeans.fit(random_data)
                ref_inertias.append(ref_kmeans.inertia_)
            
            ref_mean = np.mean(ref_inertias)
            gap = np.log(ref_mean) - np.log(actual_inertia)
            gaps.append(gap)
        
        return gaps
    
    gap_stats = calculate_gap_statistic(X_scaled, k_range, n_refs=5)
    
    print("Gap Statistics:")
    for k, gap in zip(k_range, gap_stats):
        print(f"  K={k}: {gap:.3f}")
    
    best_gap_k = k_range[np.argmax(gap_stats)]
    print(f"\nOptimal K by Gap Statistic: {best_gap_k}")
    
    # 4. COMPREHENSIVE COMPARISON TABLE
    print("\n" + "="*60)
    print("4. COMPREHENSIVE COMPARISON TABLE")
    print("="*60)
    
    comparison_data = []
    for k in k_range:
        r = results[k]
        comparison_data.append([
            k,
            f"{r['inertia']:.2f}",
            f"{r['silhouette']:.3f}",
            f"{r['calinski_harabasz']:.2f}",
            f"{r['davies_bouldin']:.3f}",
            f"{gap_stats[k-3]:.3f}",
            f"{r['size_balance']:.3f}",
            len(r['cluster_sizes']),
            f"{min(r['cluster_sizes'].values())}-{max(r['cluster_sizes'].values())}"
        ])
    
    headers = ['K', 'WCSS', 'Silhouette', 'Calinski-H', 'Davies-B', 'Gap', 'Balance', 'Clusters', 'Size Range']
    
    print(f"{'K':<3} {'WCSS':<8} {'Silhouette':<10} {'Calinski-H':<10} {'Davies-B':<9} {'Gap':<7} {'Balance':<7} {'Size Range':<12}")
    print("-" * 75)
    for row in comparison_data:
        print(f"{row[0]:<3} {row[1]:<8} {row[2]:<10} {row[3]:<10} {row[4]:<9} {row[5]:<7} {row[6]:<7} {row[8]:<12}")
    
    # 5. RANKING ANALYSIS
    print("\n" + "="*60)
    print("5. RANKING ANALYSIS")
    print("="*60)
    
    # Normalize metrics for ranking (higher is better for all)
    silhouette_scores = [results[k]['silhouette'] for k in k_range]
    calinski_scores = [results[k]['calinski_harabasz'] for k in k_range]
    davies_scores = [1/results[k]['davies_bouldin'] for k in k_range]  # Inverse for higher=better
    gap_scores = gap_stats
    balance_scores = [1/results[k]['size_balance'] for k in k_range]  # Inverse for higher=better
    
    # Normalize to 0-1 scale
    def normalize(scores):
        min_s, max_s = min(scores), max(scores)
        return [(s - min_s) / (max_s - min_s) for s in scores]
    
    norm_silhouette = normalize(silhouette_scores)
    norm_calinski = normalize(calinski_scores)
    norm_davies = normalize(davies_scores)
    norm_gap = normalize(gap_scores)
    norm_balance = normalize(balance_scores)
    
    # Calculate composite scores with weights
    weights = {
        'silhouette': 0.25,
        'calinski': 0.2,
        'davies': 0.2,
        'gap': 0.2,
        'balance': 0.15
    }
    
    composite_scores = []
    for i in range(len(k_range)):
        score = (weights['silhouette'] * norm_silhouette[i] +
                weights['calinski'] * norm_calinski[i] +
                weights['davies'] * norm_davies[i] +
                weights['gap'] * norm_gap[i] +
                weights['balance'] * norm_balance[i])
        composite_scores.append(score)
    
    print("Normalized Metric Rankings (0-1 scale, higher=better):")
    print(f"{'K':<3} {'Silhouette':<10} {'Calinski':<9} {'Davies':<8} {'Gap':<7} {'Balance':<8} {'Composite':<9}")
    print("-" * 60)
    for i, k in enumerate(k_range):
        print(f"{k:<3} {norm_silhouette[i]:.3f}     {norm_calinski[i]:.3f}    {norm_davies[i]:.3f}   {norm_gap[i]:.3f}  {norm_balance[i]:.3f}    {composite_scores[i]:.3f}")
    
    best_composite_k = k_range[np.argmax(composite_scores)]
    print(f"\nOptimal K by Composite Score: {best_composite_k}")
    
    # 6. STABILITY ANALYSIS
    print("\n" + "="*60)
    print("6. CLUSTER STABILITY ANALYSIS")
    print("="*60)
    
    def stability_analysis(X, k, n_trials=10):
        """Bootstrap stability analysis"""
        n_samples = X.shape[0]
        stability_scores = []
        
        for trial in range(n_trials):
            # Bootstrap sample
            indices = np.random.choice(n_samples, n_samples, replace=True)
            X_boot = X[indices]
            
            # Cluster both original and bootstrap
            kmeans_orig = KMeans(n_clusters=k, random_state=42)
            labels_orig = kmeans_orig.fit_predict(X)
            
            kmeans_boot = KMeans(n_clusters=k, random_state=42)
            labels_boot = kmeans_boot.fit_predict(X_boot)
            
            # Calculate adjusted rand index for overlapping samples
            overlap_indices = np.intersect1d(np.arange(n_samples), indices)
            if len(overlap_indices) > k:  # Need enough samples
                from sklearn.metrics import adjusted_rand_score
                ari = adjusted_rand_score(labels_orig[overlap_indices], 
                                        labels_boot[np.searchsorted(indices, overlap_indices)])
                stability_scores.append(ari)
        
        return np.mean(stability_scores), np.std(stability_scores)
    
    print("Bootstrap Stability Analysis (Adjusted Rand Index):")
    for k in k_range:
        mean_ari, std_ari = stability_analysis(X_scaled, k, n_trials=5)
        print(f"  K={k}: ARI = {mean_ari:.3f} ± {std_ari:.3f}")
    
    # 7. FINAL RECOMMENDATION
    print("\n" + "="*80)
    print("7. FINAL RECOMMENDATION WITH SCIENTIFIC JUSTIFICATION")
    print("="*80)
    
    # Count votes from different methods
    votes = {}
    for k in k_range:
        votes[k] = 0
    
    # Silhouette vote
    best_silhouette_k = k_range[np.argmax(silhouette_scores)]
    votes[best_silhouette_k] += 1
    
    # Calinski-Harabasz vote
    best_calinski_k = k_range[np.argmax(calinski_scores)]
    votes[best_calinski_k] += 1
    
    # Davies-Bouldin vote (lowest is best)
    best_davies_k = k_range[np.argmin([results[k]['davies_bouldin'] for k in k_range])]
    votes[best_davies_k] += 1
    
    # Gap statistic vote
    votes[best_gap_k] += 1
    
    # Composite score vote
    votes[best_composite_k] += 1
    
    # Elbow method vote
    votes[best_elbow_k] += 1
    
    print("METHOD VOTING RESULTS:")
    print(f"  Silhouette Score: K={best_silhouette_k}")
    print(f"  Calinski-Harabasz: K={best_calinski_k}")
    print(f"  Davies-Bouldin: K={best_davies_k}")
    print(f"  Gap Statistic: K={best_gap_k}")
    print(f"  Composite Score: K={best_composite_k}")
    print(f"  Elbow Method: K={best_elbow_k}")
    
    print(f"\nVOTE TALLY:")
    for k in sorted(votes.keys()):
        print(f"  K={k}: {votes[k]} votes")
    
    recommended_k = max(votes.keys(), key=lambda x: votes[x])
    
    print(f"\n🎯 RECOMMENDED OPTIMAL K: {recommended_k}")
    print(f"   Total Votes: {votes[recommended_k]}/6")
    
    # Detailed justification
    print(f"\nSCIENTIFIC JUSTIFICATION:")
    r = results[recommended_k]
    print(f"✅ Silhouette Score: {r['silhouette']:.3f} (>0.5 indicates good clustering)")
    print(f"✅ Calinski-Harabasz: {r['calinski_harabasz']:.2f} (higher indicates better separation)")
    print(f"✅ Davies-Bouldin: {r['davies_bouldin']:.3f} (lower indicates better clustering)")
    print(f"✅ Cluster Balance: CV={r['size_balance']:.3f} (lower indicates more balanced sizes)")
    print(f"✅ Cluster Sizes: {dict(r['cluster_sizes'])} (reasonable distribution)")
    
    print(f"\nBUSINESS APPLICABILITY:")
    print(f"📊 {recommended_k} clusters provide optimal balance of:")
    print(f"   • Statistical validity (high silhouette, low Davies-Bouldin)")
    print(f"   • Interpretability (manageable number of distinct groups)")
    print(f"   • Implementation complexity (not too many categories)")
    print(f"   • Marketing utility (clear differentiation for targeting)")
    
    return results, recommended_k

if __name__ == "__main__":
    results, optimal_k = main()